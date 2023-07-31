import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { Investor } from './entities/investor.entity';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dtoToEntity } from '../utils/inverstors.mapper';
import {
  ApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { log } from "../main";

@Injectable()
export class InvestorsService {
  constructor(
    @InjectRepository(Investor)
    private readonly userRepository: MongoRepository<Investor>,
  ) {}
  async create(
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

  async findAll(): Promise<Investor[]> {
    return await this.userRepository.find();
  }

  async findOne(investor_id: string): Promise<Investor> {
    return await this.userRepository.findOneBy({ _id: investor_id });
  }

  async investorExists(investor_id: string): Promise<boolean> {
    let check = false;
    return await this.findOne(investor_id).then((r) => {
      log.warn(r);
      if (r != null) {
        check = true;
        return check;
      }
    });
  }

  update(id: number, updateInvestorDto: UpdateInvestorDto) {
    return `This action updates a #${id} investor`;
  }

  remove(id: number) {
    return `This action removes a #${id} investor`;
  }
}
