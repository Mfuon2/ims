import { Injectable } from '@nestjs/common';
import { Statement } from './entities/statement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CustomApiResponse, SuccessResponse } from "../utils/response.wrapper";
import { ObjectId } from "mongodb";

@Injectable()
export class StatementsService {
  constructor(
    @InjectRepository(Statement)
    private readonly repository: MongoRepository<Statement>,
  ) {}
  findAll() {
    return `This action returns all statements`;
  }

  async findAccountBalanceStatements(
    id: string,
  ): Promise<CustomApiResponse<Statement[]>> {
    const account = new ObjectId(id);
    return SuccessResponse(
      await this.repository.find({ where: { account_id: account } }),
      'Statement loaded successfully',
    );
  }

  async createStatement(statement: Statement) {
    await this.repository.save(statement);
  }
}
