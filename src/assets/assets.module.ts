import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AccountsService } from "../accounts/accounts.service";
import { MongoRepository } from "typeorm";
import { Account } from "../accounts/entities/account.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Asset } from "./entities/asset.entity";

@Module({
  controllers: [AssetsController],
  providers: [AssetsService, MongoRepository<Asset>],
  imports: [TypeOrmModule.forFeature([Asset])],
})
export class AssetsModule {}
