import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  asset_id: string;
  @Column({ unique: true, nullable: false })
  asset_share_classCode: string;

  @Column({ nullable: false })
  asset_name: string;
  @Column({ nullable: false })
  asset_declared_rate: number;

  @Column({ type: 'double precision', default: 15.0 })
  withholding_tax: number;

  @Column({ type: 'double precision', default: 0.0 })
  unit_price: number;

  @Column({ type: 'double precision', default: 0.0 })
  guaranteed_interest_rate: number;

  @Column({ type: 'double precision', default: 0.0 })
  minimum_contribution: number;

  @Column({ type: 'double precision', default: 0.0 })
  maximum_contribution: number;

  @Column({ type: 'integer', default: 0 })
  withdrawal_limit: number;

  @Column({ type: 'double precision', default: 0.0 })
  withdrawal_limit_duration: number;

  @Column({ type: 'integer', default: 0 })
  withdrawal_limit_duration_type: number;

  @Column({ type: 'double precision', default: 0.0 })
  minimum_withdrawal: number;

  @Column({ type: 'double precision', default: 0.0 })
  maximum_withdrawal: number;

  @Column({ type: 'double precision', default: 0.0 })
  withdrawal_settlement_period: number;

  @Column()
  withdrawal_settlement_period_type: string;

  @Column({ nullable: true })
  early_withdrawal_penalty: string;

  @Column({ nullable: true })
  contribution_business_account: string;

  @CreateDateColumn()
  created_at: Date;
  @CreateDateColumn()
  updated_at: LocalDateTime;
  @Column()
  is_deleted: boolean;
}
