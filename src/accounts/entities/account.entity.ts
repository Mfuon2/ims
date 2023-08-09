import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ObjectIdColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  _id: string;
  @Column({ nullable: false })
  asset_name: string;
  @Column({ nullable: false })
  asset_id: string;
  @Column({ nullable: false })
  investor_id: string;
  @Column()
  units: number;
  @Column()
  unit_price: number;
  @Column()
  market_value: number;
  @Column()
  account_number: number;
  @Column()
  deposits = 0.0;
  @Column()
  withdrawals = 0.0;
  @Column()
  balance = 0.0;
  @Column()
  temp_balance = 0.0;
  @Column()
  cumulative_income = 0.0;
  @Column()
  is_deleted: boolean;
  @Column()
  is_active: boolean;
  @CreateDateColumn()
  created_at: Date;
  updated_at: any;
  balance_run_at: any;
}
