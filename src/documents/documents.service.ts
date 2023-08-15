import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { InvestorDocument } from './entities/document.entity';
import { dtoToEntity } from '../utils/inverstors.mapper';
import { InvestorsService } from '../investors/investors.service';
import {
  CustomApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { ObjectId } from 'mongodb';
import { today } from '../main';

@Injectable()
export class DocumentsService {
  @Inject()
  private readonly userService: InvestorsService;
  constructor(
    @InjectRepository(InvestorDocument)
    private readonly repository: Repository<InvestorDocument>,
  ) {}
  async createDocument(
    dto: CreateDocumentDto,
  ): Promise<CustomApiResponse<InvestorDocument>> {
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

  async findAllDocuments() {
    let results = null;
    try {
      results = await this.repository.find();
      return SuccessResponse(results, `Retrieved Successfully`);
    } catch (e) {
      return FailResponse(results, `Retrieving records failed`);
    }
  }

  async findOneDocument(
    id: string,
  ): Promise<CustomApiResponse<InvestorDocument>> {
    let results = null;
    try {
      const documentId = +id;
      results = await this.repository.findOneBy({ document_id: documentId });
      return SuccessResponse(results, `Retrieved Successfully`);
    } catch (e) {
      return FailResponse(results, `Retrieving records failed`);
    }
  }

  async updateDocument(id: string, dto: UpdateDocumentDto) {
    try {
      const doc = await dtoToEntity(dto, InvestorDocument);
      doc.updated_at = today;
      const results = await this.repository.update({ document_id: +id }, doc);
      return SuccessResponse(results, `Document updated successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating document (${e.message})`);
    }
  }

  async removeDocument(id: string) {
    try {
      const existing = await this.repository.findOneBy({
        document_id: +id,
      });
      existing.updated_at = today;
      existing.is_deleted = true;
      const results = await this.repository.update({ document_id: +id }, existing);
      return SuccessResponse(results, `Document removed successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating document (${e.message})`);
    }
  }
}
