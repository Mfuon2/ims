import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongoRepository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { InvestorsModule } from '../investors/investors.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, MongoRepository<Transaction>],
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    InvestorsModule,
    AccountsModule,
  ],
})
export class TransactionsModule {}
