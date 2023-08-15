import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomApiResponse } from '../utils/response.wrapper';
import { InvestorDocument } from "./entities/document.entity";

@Controller('documents')
@ApiTags('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a document' })
  @ApiBody({ type: CreateDocumentDto })
  @ApiResponse({
    status: 201,
    description: 'Document created successfully',
    type: CreateDocumentDto,
  })
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<CustomApiResponse<any>> {
    return await this.documentsService.createDocument(createDocumentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all documents' })
  @ApiResponse({
    status: 200,
    description: 'List of documents',
    type: [CreateDocumentDto],
  })
  async findAll(): Promise<CustomApiResponse<CreateDocumentDto[]>> {
    return await this.documentsService.findAllDocuments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns a document with given ID',
    type: CreateDocumentDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<CustomApiResponse<InvestorDocument>> {
    return await this.documentsService.findOneDocument(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiBody({ type: UpdateDocumentDto })
  @ApiResponse({
    status: 200,
    description: 'Document updated successfully',
    type: CreateDocumentDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<CustomApiResponse<any>> {
    return await this.documentsService.updateDocument(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Document removed successfully' })
  async remove(@Param('id') id: string): Promise<CustomApiResponse<any>> {
    return await this.documentsService.removeDocument(id);
  }
}
