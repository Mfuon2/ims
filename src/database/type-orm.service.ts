import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Investor } from '../investors/entities/investor.entity';
import { InvestorDocument } from '../documents/entities/document.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      url: 'mongodb://localhost:27017/ims',
      synchronize: true,
      autoLoadEntities: true,
      username: 'investor',
      password: 'investor-Admin123',
      database: 'ims',
      entities: [Investor, InvestorDocument],
    };
  }
}