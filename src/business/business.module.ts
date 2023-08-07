import { Module } from '@nestjs/common';
import { DepositLogicService } from './deposit-logic.service';
import { AccountsModule } from '../accounts/accounts.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  providers: [DepositLogicService],
  imports: [AccountsModule, AssetsModule],
  exports: [DepositLogicService],
})
export class BusinessModule {}
