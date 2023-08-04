import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongoRepository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorDocument } from './entities/document.entity';
import { InvestorsModule } from '../investors/investors.module';
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, MongoRepository<InvestorDocument>],
  imports: [TypeOrmModule.forFeature([InvestorDocument]), InvestorsModule],
})
export class DocumentsModule {}
