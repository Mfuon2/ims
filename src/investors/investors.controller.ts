import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('investors')
@ApiTags('investors')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an investor' })
  @ApiBody({ type: CreateInvestorDto })
  @ApiResponse({
    status: 201,
    description: 'Investor created successfully',
    type: CreateInvestorDto,
  })
  async create(@Body() createInvestorDto: CreateInvestorDto) {
    return await this.investorsService.createInvestor(createInvestorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all investors' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of investors',
    type: [CreateInvestorDto],
  })
  async findAll() {
    return await this.investorsService.findAllInvestors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an investor by ID' })
  @ApiParam({ name: 'id', description: 'Investor ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns an investor with specified ID',
    type: CreateInvestorDto,
  })
  async findOne(@Param('id') id: string) {
    return this.investorsService.findOneInvestor(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an investor by ID' })
  @ApiParam({ name: 'id', description: 'Investor ID', type: 'string' })
  @ApiBody({ type: UpdateInvestorDto })
  @ApiResponse({
    status: 200,
    description: 'Investor updated successfully',
    type: CreateInvestorDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    return this.investorsService.updateInvestor(id, updateInvestorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an investor by ID' })
  @ApiParam({ name: 'id', description: 'Investor ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Investor removed successfully' })
  async remove(@Param('id') id: string) {
    return this.investorsService.removeInvestor(id);
  }
}
