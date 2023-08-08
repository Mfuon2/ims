import { Module } from '@nestjs/common';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';
import { MongoRepository } from 'typeorm';
import { Statement } from './entities/statement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StatementsController],
  providers: [StatementsService, MongoRepository<Statement>],
  imports: [TypeOrmModule.forFeature([Statement])],
  exports: [StatementsService],
})
export class StatementsModule {}
