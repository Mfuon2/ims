import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { Investor } from '../../investors/entities/investor.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  account_id: number;
  @Column({ nullable: false, unique: true })
  asset_name: string;
  @Column({ nullable: false })
  asset_id: string;
  @Column()
  units: number;
  @Column()
  unit_price: number;
  @Column()
  market_value: number;
  @Column()
  account_number: number;
  @Column()
  deposits: number;
  @Column()
  withdrawals: number;
  @Column()
  balance: number;
  @Column()
  temp_balance: number;
  @Column()
  cumulative_income: number;
  @Column()
  is_deleted: boolean;
  @Column()
  is_active: boolean;
  @CreateDateColumn()
  created_at: LocalDateTime;
  @UpdateDateColumn()
  updated_at: LocalDateTime;
  balance_run_at: LocalDateTime;

  @ManyToOne(() => Investor, (investor) => investor.accounts)
  investor: Investor;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
