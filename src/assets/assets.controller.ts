import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query
} from "@nestjs/common";
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomApiResponse } from '../utils/response.wrapper';
import { PageOptionsDto } from "../utils/pagination/page.dto";

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({
    status: 201,
    description: 'The asset has been successfully created.',
    type: CreateAssetDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  async create(
    @Body() createAssetDto: CreateAssetDto,
  ): Promise<CustomApiResponse<CreateAssetDto>> {
    return await this.assetsService.createAsset(createAssetDto);
  }

  @ApiOperation({ summary: 'Get all assets' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of assets.',
    type: [CreateAssetDto],
    isArray: true,
  })
  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<CustomApiResponse<CreateAssetDto[]>> {
    return await this.assetsService.findAllAssets(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Get a single asset by ID' })
  @ApiResponse({
    status: 200,
    description: 'The asset has been found.',
    type: CreateAssetDto,
  })
  @ApiResponse({ status: 404, description: 'Asset not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomApiResponse<CreateAssetDto>> {
    return await this.assetsService.findOneAsset(id);
  }

  @ApiOperation({ summary: 'Update an asset by ID' })
  @ApiResponse({
    status: 200,
    description: 'The asset has been successfully updated.',
    type: CreateAssetDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Asset not found.' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<CustomApiResponse<CreateAssetDto>> {
    return await this.assetsService.updateAsset(id, updateAssetDto);
  }

  @ApiOperation({ summary: 'Remove an asset by ID' })
  @ApiResponse({
    status: 200,
    description: 'The asset has been successfully removed.',
    type: CreateAssetDto,
  })
  @ApiResponse({ status: 404, description: 'Asset not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CustomApiResponse<CreateAssetDto>> {
    return await this.assetsService.removeAsset(id);
  }
}
