import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { Investor } from './entities/investor.entity';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dtoToEntity } from '../utils/inverstors.mapper';
import { ObjectId } from 'mongodb';
import {
  ApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { log } from '../main';

@Injectable()
export class InvestorsService {
  constructor(
    @InjectRepository(Investor)
    private readonly userRepository: MongoRepository<Investor>,
  ) {}
  async createInvestor(
    createInvestorDto: CreateInvestorDto,
  ): Promise<ApiResponse<Investor>> {
    try {
      const investor = await dtoToEntity(createInvestorDto, Investor);
      return SuccessResponse(
        await this.userRepository.save(investor),
        'Investor Saved Successfully',
      );
    } catch (e) {
      return FailResponse(null, `Error while saving investor (${e.message})`);
    }
  }

  async findAllInvestors(): Promise<Investor[]> {
    return await this.userRepository.find();
  }

  async findOneInvestor(investor_id: string): Promise<ApiResponse<any>> {
    let results = null;
    const investorId = new ObjectId(investor_id);
    try {
      results = await this.userRepository.findOneBy({ _id: investorId });
      if (results == null) {
        throw new NotFoundException(`Error while checking up records`);
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

  updateInvestor(id: string, updateInvestorDto: UpdateInvestorDto) {
    return `This action updates a #${id} investor`;
  }

  removeInvestor(id: number) {
    return `This action removes a #${id} investor`;
  }
}
