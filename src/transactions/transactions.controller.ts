import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: 201,
    description: 'The transaction has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionsService.createTransaction(
      createTransactionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all transactions' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of transactions.',
  })
  async findAll() {
    return await this.transactionsService.findAllTransactions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a transaction by the given id' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Transaction ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the transaction with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  async findOne(@Param('id') id: string) {
    return await this.transactionsService.findOneTransaction(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction by the given id' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Transaction ID',
  })
  @ApiBody({ type: UpdateTransactionDto })
  @ApiResponse({
    status: 200,
    description: 'The transaction has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionsService.updateTransaction(
      id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a transaction by the given id' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Transaction ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The transaction has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  async remove(@Param('id') id: string) {
    return await this.transactionsService.removeTransaction(id);
  }
}
