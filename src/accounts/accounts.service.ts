import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {
  CustomApiResponse,
  FailResponse,
  SuccessResponse,
} from '../utils/response.wrapper';
import { Account } from './entities/account.entity';
import { ObjectId } from 'mongodb';
import { dtoToEntity } from '../utils/inverstors.mapper';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from "../main";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: MongoRepository<Account>,
  ) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<CustomApiResponse<Account>> {
    try {
      const account = await dtoToEntity(createAccountDto, Account);
      console.warn(JSON.stringify(account));
      return SuccessResponse(
        await this.repository.save(account),
        'Account Saved Successfully',
      );
    } catch (e) {
      return FailResponse(null, `Error while saving account (${e.message})`);
    }
  }

  async findAllAccounts(): Promise<CustomApiResponse<Account[]>> {
    try {
      const results = await this.repository.find();
      return SuccessResponse(results, `Accounts Retrieved Successfully`);
    } catch (e) {
      return FailResponse(null, `Retrieving accounts failed`);
    }
  }

  async findOneAccount(
    account_id: string,
  ): Promise<CustomApiResponse<Account>> {
    let result = null;
    const accountId = new ObjectId(account_id);
    try {
      result = await this.repository.findOneBy({ _id: accountId });
      if (!result) {
        return FailResponse(result, `Account not found`);
      }
      return SuccessResponse(result, `Account Retrieved Successfully`);
    } catch (e) {
      return FailResponse(null, `Failed to retrieve account (${e.message})`);
    }
  }

  async accountExists(account_id: string): Promise<boolean> {
    const account = await this.findOneAccount(account_id);
    return account.success;
  }

  async updateAccount(id: string, dto: UpdateAccountDto): Promise<any> {
    try {
      const doc = await dtoToEntity(dto, Account);
      const account = await this.repository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!account) {
        return FailResponse(null, `Account not found`);
      }
      account.updated_at = new Date();
      const result = await this.repository.updateOne(
        { _id: new ObjectId(id) },
        { $set: doc },
      );
      return SuccessResponse(result, `Account updated successfully`);
    } catch (e) {
      return FailResponse(null, `Error while updating account (${e.message})`);
    }
  }

  async removeAccount(id: string): Promise<CustomApiResponse<any>> {
    try {
      const account = await this.repository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!account) {
        return FailResponse(null, `Account not found`);
      }

      account.updated_at = new Date();
      account.is_deleted = true;

      const result = await this.repository.save(account);
      return SuccessResponse(result, `Account removed successfully`);
    } catch (e) {
      return FailResponse(null, `Error while removing account (${e.message})`);
    }
  }
}
