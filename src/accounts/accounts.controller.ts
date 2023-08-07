import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountsService.createAccount(createAccountDto);
  }

  @Get()
  async findAll() {
    return await this.accountsService.findAllAccounts();
  }

  @Get('/update_balances')
  async updateBalances() {
    return await this.accountsService.updateBalances();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accountsService.findOneAccount(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return await this.accountsService.updateAccount(id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.accountsService.removeAccount(id);
  }
}
