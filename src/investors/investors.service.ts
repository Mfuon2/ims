import { Injectable } from '@nestjs/common';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { Investor } from './entities/investor.entity';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dtoToEntity } from '../utils/inverstors.mapper';
import { ObjectId } from 'mongodb';
import {
  CustomApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { log } from '../main';

@Injectable()
export class InvestorsService {
  constructor(
    @InjectRepository(Investor)
    private readonly repository: MongoRepository<Investor>,
  ) {}

  async createInvestor(
    createInvestorDto: CreateInvestorDto,
  ): Promise<CustomApiResponse<Investor>> {
    try {
      const investor = await dtoToEntity(createInvestorDto, Investor);
      return SuccessResponse(
        await this.repository.save(investor),
        'Investor Saved Successfully',
      );
    } catch (e) {
      return FailResponse(null, `Error while saving investor (${e.message})`);
    }
  }

  async findAllInvestors(): Promise<CustomApiResponse<any>> {
    try {
      const results = await this.repository.find();
      return SuccessResponse(results, `Retrieved Successfully`);
    } catch (e) {
      return FailResponse(null, `Retrieving records failed`);
    }
  }

  async findOneInvestor(investor_id: string): Promise<CustomApiResponse<any>> {
    let results = null;
    const investorId = new ObjectId(investor_id);
    try {
      results = await this.repository.findOneBy({ _id: investorId });
      if (results == null) {
        return FailResponse(results, `Error while checking up records`);
      }
      return SuccessResponse(results, `Success`);
    } catch (e) {
      return FailResponse(results, `Failed with error ${e.message}`);
    }
  }

  async investorExists(investor_id: string): Promise<boolean> {
    let check = false;
    return await this.findOneInvestor(investor_id).then((r) => {
      if (r != null) {
        check = true;
        return check;
      }
    });
  }

  async updateInvestor(id: string, dto: UpdateInvestorDto) {
    try {
      const doc = await dtoToEntity(dto, Investor);
      const investor = await this.repository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!investor) {
        return FailResponse(null, `Investor not found`);
      }
      investor.updated_at = new Date();
      const results = await this.repository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: doc },
      );
      return SuccessResponse(results, `Investor updated successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating investor (${e.message})`);
    }
  }

  async removeInvestor(id: string) {
    try {
      const investor = await this.repository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!investor) {
        return FailResponse(null, `Investor not found`);
      }

      investor.updated_at = new Date();
      investor.is_deleted = true;

      const results = await this.repository.save(investor);
      return SuccessResponse(results, `Investor removed successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating investor (${e.message})`);
    }
  }
}
