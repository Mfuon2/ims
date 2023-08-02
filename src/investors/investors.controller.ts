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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('investors')
@ApiTags('investors')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @Post()
  @ApiBody({ type: CreateInvestorDto })
  async create(@Body() createInvestorDto: CreateInvestorDto) {
    return await this.investorsService.createInvestor(createInvestorDto);
  }

  @Get()
  @ApiResponse({ type: [CreateInvestorDto] })
  async findAll() {
    return await this.investorsService.findAllInvestors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorsService.findOneInvestor(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    return this.investorsService.updateInvestor(id, updateInvestorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorsService.removeInvestor(id);
  }
}
