import {
  Column,
  CreateDateColumn, Entity,
  Generated,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";

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
  units = 0.0;
  @Column()
  unit_price = 0.0;
  @Column()
  market_value = 0.0;
  @Column()
  account_number = 0.0;
  @Column()
  deposits = 0.0;
  @Column()
  withdrawals = 0.0;
  @Column()
  balance = 0.0;
  @Column()
  cumulative_income = 0.0;
  @Column()
  is_deleted: boolean;
  @Column()
  is_active = false;
  @CreateDateColumn()
  created_at: Date;
  updated_at: Date;
  balance_run_at: Date;
}
