import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { AssetsService } from '../assets/assets.service';
import { CustomApiResponse } from '../utils/response.wrapper';
import { Account } from '../accounts/entities/account.entity';
import { AccountsService } from '../accounts/accounts.service';
import { UpdateAccountDto } from '../accounts/dto/update-account.dto';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@Injectable()
export class DepositLogicService {
  @Inject()
  private readonly assetService: AssetsService;

  @Inject()
  private readonly accountService: AccountsService;
  async updateInvestorAccount(transaction: CreateTransactionDto, acc: Account) {
    const updateDto: UpdateAccountDto = new UpdateAccountDto();
    const rules: CustomApiResponse<any> = await this.assetService.findOneAsset(
      transaction.asset_id,
    );
    const asset = rules.data;
    if (transaction.amount < asset.minimum_contribution) {
      throw new RuntimeException(
        `Minimum deposit amount is ${asset.minimum_contribution}`,
      );
    }
    updateDto.temp_balance = transaction.amount;
    updateDto.deposits = acc.deposits + transaction.amount;
    await this.accountService.updateAccount(transaction.account_id, updateDto);
  }
}
