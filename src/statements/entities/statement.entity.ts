import { Column, CreateDateColumn, Entity, Generated, ObjectIdColumn } from "typeorm";
import { LocalDateTime } from '@js-joda/core';

@Entity('statements')
export class Statement {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  _id: string;
  @Column()
  account_id: number;

  @Column()
  opening_balance: number;

  @Column()
  rate_applied: number;
  @Column()
  annual_interest: number;
  @Column()
  gross_interest: number;
  @Column()
  withholding_tax: number;
  @Column()
  net_interest: number;
  @Column()
  closing_balance: number;
  @Column()
  statement_type: StatementType;
  @CreateDateColumn()
  created_at: LocalDateTime;
}

export enum StatementType {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  SEMI_ANNUALLY = 'SEMI_ANNUALLY',
  ANNUALLY = 'ANNUALLY',
}
