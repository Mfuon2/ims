import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Asset } from './entities/asset.entity';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import {
  CustomApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { log } from '../main';
import { dtoToEntity } from '../utils/inverstors.mapper';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly repository: MongoRepository<Asset>,
  ) {}

  async createAsset(
    createAssetDto: CreateAssetDto,
  ): Promise<CustomApiResponse<Asset>> {
    try {
      const asset = await dtoToEntity(createAssetDto, Asset);
      return SuccessResponse(
        await this.repository.save(asset),
        'Asset Saved Successfully',
      );
    } catch (e) {
      return FailResponse(null, `Error while saving asset (${e.message})`);
    }
  }

  async findAllAssets(): Promise<CustomApiResponse<any>> {
    try {
      const results = await this.repository.find();
      return SuccessResponse(results, `Retrieved Successfully`);
    } catch (e) {
      return FailResponse(null, `Retrieving records failed`);
    }
  }

  async findOneAsset(asset_id: string): Promise<CustomApiResponse<any>> {
    let results = null;
    const assetId = new ObjectId(asset_id);
    try {
      results = await this.repository.findOneBy({ _id: assetId });
      if (results == null) {
        return FailResponse(results, `Error while checking up records`);
      }
      return SuccessResponse(results, `Success`);
    } catch (e) {
      return FailResponse(results, `Failed with error ${e.message}`);
    }
  }

  async assetExists(asset_id: string): Promise<boolean> {
    const asset = await this.findOneAsset(asset_id);
    return asset.success;
  }

  async updateAsset(id: string, dto: UpdateAssetDto) {
    try {
      const doc = await dtoToEntity(dto, Asset);
      const asset = await this.repository.findOneBy({ _id: new ObjectId(id) });
      if (!asset) {
        return FailResponse(null, `Asset not found`);
      }
      asset.updated_at = new Date();
      const results = await this.repository.save({ ...asset, ...doc });
      return SuccessResponse(results, `Asset updated successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating asset (${e.message})`);
    }
  }

  async removeAsset(id: string) {
    try {
      const asset = await this.repository.findOneBy({ _id: new ObjectId(id) });
      if (!asset) {
        return FailResponse(null, `Asset not found`);
      }

      asset.updated_at = new Date();
      asset.is_deleted = true;

      const results = await this.repository.save(asset);
      return SuccessResponse(results, `Asset removed successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating asset (${e.message})`);
    }
  }
}
