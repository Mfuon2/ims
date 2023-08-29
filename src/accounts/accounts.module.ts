import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongoRepository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AssetsModule } from '../assets/assets.module';
import { StatementsModule } from '../statements/statements.module';
import { InvestorsModule } from '../investors/investors.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, MongoRepository<Account>],
  imports: [
    TypeOrmModule.forFeature([Account]),
    AssetsModule,
    StatementsModule,
    InvestorsModule,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
