import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  ObjectIdColumn, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { LocalDateTime } from '@js-joda/core';
import { Investor } from '../../investors/entities/investor.entity';
import { Account } from '../../accounts/entities/account.entity';

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

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transaction_id: number;
  @Column()
  transaction_reference: string;
  @Column({ default: 0 })
  amount: number;
  @Column({ enum: TransactionType })
  transaction_type: string;
  @Column({ nullable: false })
  investor_id: string;
  @Column({ nullable: false })
  asset_id: string;
  @Column({ nullable: false })
  account_id: string;
  @Column({ default: false })
  deposit: boolean;
  @Column({ default: false })
  withdraw: boolean;
  @CreateDateColumn()
  created_at: LocalDateTime;

  @UpdateDateColumn()
  updated_at: LocalDateTime;
  @ManyToOne(() => Account, (acc) => acc.transactions)
  account: Account;
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
