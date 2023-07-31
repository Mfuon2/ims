import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Investor } from '../investors/entities/investor.entity';
import { MongoRepository } from 'typeorm';
import { InvestorDocument } from './entities/document.entity';
import { dtoToEntity } from '../utils/inverstors.mapper';
import { InvestorsService } from '../investors/investors.service';
import {
  ApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';

@Injectable()
export class DocumentsService {
  @Inject()
  private readonly userService: InvestorsService;
  constructor(
    @InjectRepository(InvestorDocument)
    private readonly repository: MongoRepository<InvestorDocument>,
  ) {}
  async create(dto: CreateDocumentDto): Promise<ApiResponse<InvestorDocument>> {
    try {
      const investor: boolean = await this.userService.investorExists(
        dto.investor_id,
      );
      if (!investor) {
        throw new NotFoundException('Investor does not exists');
      }
      const docs = await dtoToEntity(dto, InvestorDocument);
      return SuccessResponse(
        await this.repository.save(docs),
        'Saved Successfully',
      );
    } catch (e) {
      return FailResponse(null, `Error while saving document (${e.message})`);
    }
  }

  findAll() {
    return `This action returns all documents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
