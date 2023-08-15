import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Investor } from '../investors/entities/investor.entity';
import { InvestorDocument } from '../documents/entities/document.entity';
import { Asset } from '../assets/entities/asset.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Account } from '../accounts/entities/account.entity';
import { Statement } from '../statements/entities/statement.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 32768,
      synchronize: true,
      autoLoadEntities: true,
      username: 'postgres',
      password: 'postgrespw',
      database: 'app',
      schema: 'public',
      entities: [
        Investor,
        InvestorDocument,
        Asset,
        Transaction,
        Account,
        Statement,
      ],
    };
  }
}
