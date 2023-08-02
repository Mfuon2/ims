import {
  Deposit,
  TransactionType,
  Withdrawal,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  transaction_reference: string;
  amount = 0;
  transaction_type: TransactionType;
  investor_id: string;
  asset_id: string;
  account_id: string;
  deposit: Deposit;
  withdraw: Withdrawal;
  is_deleted: boolean;
}
