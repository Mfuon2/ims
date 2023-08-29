import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {
  CustomApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { Account } from './entities/account.entity';
import { ObjectId } from 'mongodb';
import { dtoToEntity } from '../utils/inverstors.mapper';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  dailyCompoundedInterest,
  monthlyCompoundedInterest,
} from '../business/interest-calculator.service';
import { AssetsService } from '../assets/assets.service';
import { log, today } from '../main';
import {
  Statement,
  StatementType,
} from '../statements/entities/statement.entity';
import { StatementsService } from '../statements/statements.service';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../utils/pagination/page.dto';
import { InvestorsService } from '../investors/investors.service';

@Injectable()
export class AccountsService {
  @Inject()
  private readonly assetService: AssetsService;

  @Inject()
  private readonly investorService: InvestorsService;

  @Inject()
  private readonly statementService: StatementsService;
  constructor(
    @InjectRepository(Account)
    private readonly repository: MongoRepository<Account>,
  ) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<CustomApiResponse<Account>> {
    try {
      const account = await dtoToEntity(createAccountDto, Account);
      const investor = await this.investorService.findOneInvestor(
        createAccountDto.investor,
      );

      if (investor.data === null) {
        throw new NotFoundException(`Investor not found`);
      }

      account.investor = investor.data;
      return SuccessResponse(
        await this.repository.save(account),
        'Account Saved Successfully',
      );
    } catch (e) {
      return FailResponse(null, `Error while saving account (${e.message})`);
    }
  }

  async findAllAccounts(
    pageOptionsDto: PageOptionsDto,
  ): Promise<CustomApiResponse<PageDto<Account>>> {
    try {
      const queryBuilder = this.repository.createQueryBuilder('accounts');
      queryBuilder
        .orderBy('created_at', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      const results = new PageDto(entities, pageMetaDto);
      return SuccessResponse(results, `Accounts Retrieved Successfully`);
    } catch (e) {
      return FailResponse(null, `Retrieving accounts failed`);
    }
  }

  async findOneAccount(
    account_id: string,
  ): Promise<CustomApiResponse<Account>> {
    let result = null;
    try {
      result = await this.repository.findOneBy({ account_id: account_id });
      if (!result) {
        return FailResponse(result, `Account not found`);
      }
      return SuccessResponse(result, `Account Retrieved Successfully`);
    } catch (e) {
      return FailResponse(null, `Failed to retrieve account (${e.message})`);
    }
  }

  async accountExists(account_id: string): Promise<boolean> {
    const account = await this.findOneAccount(account_id);
    return account.success;
  }

  async updateAccount(id: string, dto: UpdateAccountDto): Promise<any> {
    try {
      const doc = await dtoToEntity(dto, Account);
      const account = await this.repository.findOneBy({
        account_id: id,
      });
      if (!account) {
        throw new NotFoundException(`Account was not found`);
      }
      account.updated_at = today;
      const result = await this.repository.update(new ObjectId(id), doc);
      return SuccessResponse(result, `Account updated successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating account (${e.message})`);
    }
  }

  async removeAccount(id: string): Promise<CustomApiResponse<any>> {
    try {
      const account = await this.repository.findOneBy({
        account_id: id,
      });
      if (!account) {
        throw new NotFoundException(`Account was not found`);
      }

      account.updated_at = today;
      account.is_deleted = true;

      const result = await this.repository.save(account);
      return SuccessResponse(result, `Account removed successfully`);
    } catch (e) {
      return FailResponse(null, `Error while removing account (${e.message})`);
    }
  }

  async updateMonthlyBalances() {
    const accounts = await this.repository.find({
      where: { is_deleted: false, is_active: true },
    });
    const assets = await this.assetService.findAssetByClassCode('MMF');
    const withholding_tax = assets.data.withholding_tax / 100;

    for (const acc of accounts) {
      /*
       * Save the account details
       * */
      const initialBalance = acc.balance + acc.temp_balance;
      acc.temp_balance = 0;
      log.warn(acc.balance);
      const annualInterest = await monthlyCompoundedInterest(
        initialBalance,
        11 /* TODO: Include function to pull declared rated from backend https://github.com/Mfuon2/ims/issues/13 */,
        1,
      );
      const unit_price = assets.data.unit_price;
      const grossInterest = annualInterest / 12;
      const tax = (annualInterest * withholding_tax) / 12;
      const netInterest = grossInterest - tax;
      acc.balance = initialBalance + netInterest;
      acc.updated_at = today;
      acc.balance_run_at = today;
      acc.units = acc.balance / unit_price;
      acc.cumulative_income = netInterest + acc.cumulative_income;
      acc.market_value = acc.units * unit_price;
      await this.repository.save(acc);

      /*
       * create a statement based on that account
       * */
      const statement = new Statement();
      statement.account_id = acc.account_id;
      statement.statement_type = StatementType.MONTHLY;
      statement.opening_balance = initialBalance;
      statement.withholding_tax = tax;
      statement.annual_interest = annualInterest;
      statement.gross_interest = grossInterest;
      statement.net_interest = netInterest;
      statement.closing_balance = acc.balance;
      statement.created_at = today;
      await this.statementService.createStatement(statement);
    }
    return SuccessResponse({}, `Success for ${accounts.length} accounts`);
  }

  async updateDailyBalances() {
    const accounts = await this.repository.find({
      where: { is_deleted: false, is_active: true },
    });
    const assets = await this.assetService.findAssetByClassCode('MMF');
    const withholding_tax = assets.data.withholding_tax / 100;

    for (const acc of accounts) {
      const initialBalance = acc.balance;
      log.warn(acc.balance);
      const interest = await dailyCompoundedInterest(initialBalance, 11);
      const grossInterest = interest / 12;
      const tax = (interest * withholding_tax) / 12;
      const netInterest = grossInterest - tax;
      acc.balance = initialBalance + netInterest;
      acc.updated_at = today;
      acc.balance_run_at = today;
      await this.repository.save(acc);
    }
    return SuccessResponse({}, `Success for ${accounts.length} accounts`);
  }
}
