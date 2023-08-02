import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Withdrawal {
  withdrawal_narration: string;
  withdrawal_reference: string;
  withdrawal_status: WithdrawalStatus;
  withdrawal_amount = 0.0;
}
export class Deposit {
  payment_from: string;
  payment_request_id: string;
  payment_reference: string;
  description: string;
  payment_type: PaymentType;
  payment_status: DepositStatus;
  payment_amount = 0.0;
}

@Entity('transactions')
export class Transaction {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  _id: string;
  @Column()
  transaction_reference: string;
  @Column()
  amount = 0;
  @Column()
  transaction_type: TransactionType;
  @Column({ nullable: false })
  investor_id: string;
  @Column({ nullable: false })
  asset_id: string;
  @Column({ nullable: false })
  account_id: string;
  @Column()
  deposit: Deposit;
  @Column()
  withdraw: Withdrawal;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  is_deleted: boolean;
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

enum PaymentType {
  MPESA = 'MPESA',
  CARD = 'CARD',
}

enum DepositStatus {
  INITIATED = 'INITIATED',
  INITIATE_FAILED = 'INITIATE_FAILED',
  PENDING = 'PENDING',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  TOPUP_COMPLETE = 'TOPUP_COMPLETE',
  TOPUP_PENDING = 'TOPUP_PENDING',
  TOPUP_FAILED = 'TOPUP_FAILED',
}

enum WithdrawalStatus {
  INITIATED = 'INITIATED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SUCCESSFUL = 'SUCCESSFUL',
}
