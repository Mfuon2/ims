import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { dtoToEntity } from '../utils/inverstors.mapper';
import { ObjectId } from 'mongodb';
import { AccountsService } from '../accounts/accounts.service';
import { InvestorsService } from '../investors/investors.service';
import { AssetsService } from '../assets/assets.service';
import { log, today } from '../main';
import { DepositLogicService } from '../business/deposit-logic.service';

@Injectable()
export class TransactionsService {
  @Inject()
  private readonly accountService: AccountsService;

  @Inject()
  private readonly investor: InvestorsService;

  @Inject()
  private readonly assets: AssetsService;

  @Inject()
  private readonly depositLogic: DepositLogicService;

  constructor(
    @InjectRepository(Transaction)
    private readonly repository: MongoRepository<Transaction>,
  ) {}

  async createTransaction(
    dto: CreateTransactionDto,
  ): Promise<CustomApiResponse<Transaction>> {
    try {
      const transaction = await dtoToEntity(dto, Transaction);
      const exist = await this.accountService.findOneAccount(dto.account_id);
      if (!exist.success) {
        throw new NotFoundException(`Account was not found`);
      }

      const investor = await this.investor.investorExists(dto.investor_id);
      if (!investor) {
        throw new NotFoundException(`Investor was not found`);
      }

      const assets = await this.assets.assetExists(dto.asset_id);
      if (!assets) {
        throw new NotFoundException(`Asset class was not found`);
      }
      log.warn(dto.transaction_type);
      if (
        dto.transaction_type
          .toString()
          .match(TransactionType.DEPOSIT.toString())
      ) {
        await this.depositLogic.updateInvestorAccount(dto, exist.data);
      }

      return SuccessResponse(
        await this.repository.save(transaction),
        'Transaction Saved Successfully',
      );
    } catch (e) {
      return FailResponse(
        null,
        `Error while saving transaction (${e.message})`,
      );
    }
  }

  async findAllTransactions(): Promise<CustomApiResponse<Transaction[]>> {
    try {
      const results = await this.repository.find();
      return SuccessResponse(results, `Transactions Retrieved Successfully`);
    } catch (e) {
      return FailResponse(null, `Retrieving transactions failed`);
    }
  }

  async findOneTransaction(
    transaction_id: string,
  ): Promise<CustomApiResponse<Transaction>> {
    let result = null;
    const transactionId = new ObjectId(transaction_id);
    try {
      result = await this.repository.findOneBy({ _id: transactionId });
      if (!result) {
        return FailResponse(result, `Transaction not found`);
      }
      return SuccessResponse(result, `Transaction Retrieved Successfully`);
    } catch (e) {
      return FailResponse(
        null,
        `Failed to retrieve transaction (${e.message})`,
      );
    }
  }

  async transactionExists(transaction_id: string): Promise<boolean> {
    const transaction = await this.findOneTransaction(transaction_id);
    return transaction.success;
  }

  async updateTransaction(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<CustomApiResponse<any>> {
    try {
      const doc = await dtoToEntity(dto, Transaction);
      const transaction = await this.repository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!transaction) {
        return FailResponse(null, `Transaction not found`);
      }
      transaction.updated_at = today;
      const result = await this.repository.updateOne(
        { _id: new ObjectId(id) },
        { $set: doc },
      );
      return SuccessResponse(result, `Transaction updated successfully`);
    } catch (e) {
      return FailResponse(
        null,
        `Error while updating transaction (${e.message})`,
      );
    }
  }

  async removeTransaction(id: string): Promise<CustomApiResponse<Transaction>> {
    try {
      const transaction = await this.repository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!transaction) {
        return FailResponse(null, `Transaction not found`);
      }

      transaction.updated_at = today;
      transaction.is_deleted = true;

      const result = await this.repository.save(transaction);
      return SuccessResponse(result, `Transaction removed successfully`);
    } catch (e) {
      return FailResponse(
        null,
        `Error while removing transaction (${e.message})`,
      );
    }
  }
}
