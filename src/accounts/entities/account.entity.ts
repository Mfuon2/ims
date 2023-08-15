import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { Investor } from '../../investors/entities/investor.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('identity')
  account_id: number;
  @Column({ nullable: false })
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
  created_at: Date;
  @UpdateDateColumn()
  updated_at: LocalDateTime;
  balance_run_at: LocalDateTime;

  @ManyToOne(() => Investor, (investor) => investor.accounts)
  investor: Investor;
}
