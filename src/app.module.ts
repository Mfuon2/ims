import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { InvestorsModule } from './investors/investors.module';
import { TypeOrmService } from './database/type-orm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModule } from './documents/documents.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AssetsModule } from './assets/assets.module';
import { TransformInterceptor } from './interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BusinessModule } from './business/business.module';
import { StatementsModule } from './statements/statements.module';

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
    BusinessModule,
    StatementsModule,
  ],
  controllers: [],
  providers: [AppService, TypeOrmService, InvestorsModule, DocumentsModule],
})
export class AppModule {}
