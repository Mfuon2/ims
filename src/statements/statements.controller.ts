import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatementsService } from './statements.service';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { ApiTags } from "@nestjs/swagger";

@Controller('statements')
@ApiTags('statements')
export class StatementsController {
  constructor(private readonly statementsService: StatementsService) {}
  @Get('/monthly')
  findAll() {
    return this.statementsService.findAll();
  }

  @Get('/monthly/:account_id')
  findAccountStatements(@Param('account_id') account_id: string) {
    return this.statementsService.findAccountBalanceStatements(account_id);
  }
}
