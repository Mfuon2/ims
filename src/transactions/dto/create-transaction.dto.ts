import {
  Deposit,
  TransactionType,
  Withdrawal,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  transaction_reference: string;
  amount = 0;
  transaction_type: string;
  investor_id: string;
  asset_id: string;
  account_id: string;
  deposit: boolean;
  withdraw: boolean;
  is_deleted: boolean;
}
