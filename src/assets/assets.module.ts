import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MongoRepository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService, MongoRepository<Asset>],
  imports: [TypeOrmModule.forFeature([Asset])],
  exports: [AssetsService],
})
export class AssetsModule {}
