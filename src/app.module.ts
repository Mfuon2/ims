import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { InvestorsModule } from './investors/investors.module';
import { TypeOrmService } from './database/type-orm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModule } from './documents/documents.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    InvestorsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    DocumentsModule,
    AccountsModule,
    TransactionsModule,
    AssetsModule,
  ],
  controllers: [],
  providers: [AppService, TypeOrmService, InvestorsModule, DocumentsModule],
})
export class AppModule {}
