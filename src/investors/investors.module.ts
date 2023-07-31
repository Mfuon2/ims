import { Module } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { InvestorsController } from './investors.controller';
import { MongoRepository } from 'typeorm';
import { Investor } from './entities/investor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [InvestorsController],
  providers: [InvestorsService, MongoRepository<Investor>],
  imports: [TypeOrmModule.forFeature([Investor])],
  exports: [InvestorsService],
})
export class InvestorsModule {}
