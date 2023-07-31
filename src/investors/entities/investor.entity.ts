import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataEncryptionTransformerConfig } from '../../utils/encryption.config';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('investors')
export class Investor {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'client_code', nullable: false })
  clientCode: string;

  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({
    name: 'mobile',
    nullable: false,
    transformer: new EncryptionTransformer(DataEncryptionTransformerConfig),
  })
  mobile: string;

  @Column({
    name: 'identity',
    nullable: false,
    transformer: new EncryptionTransformer(DataEncryptionTransformerConfig),
  })
  identity: string;
  @Column({
    name: 'identity_type',
    nullable: false,
    enum: ['NATIONAL_ID', 'PASSPORT', 'ALIEN_ID'],
  })
  identity_type: string[];

  @Column({ name: 'dob', nullable: false })
  date_of_birth: Date;

  @Column({ name: 'tax_number', nullable: false })
  tax_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class InvestorAccountEntity {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  account_id: string;

  @Column({ name: 'fund_name', nullable: false })
  fund_name: string;
  @Column()
  units = 0.0;
  @Column()
  unit_price = 0.0;
  @Column()
  balance = 0.0;
  @Column()
  accountNumber = 0.0;
  @Column()
  investor_id: string;
  @Column()
  cumulative_income = 0.0;
  @Column()
  market_value = 0.0;
  @Column()
  is_active = false;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class InvestorTransactionEntity {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  transactions_id: string;
  @Column()
  mode: string;
  @Column()
  transaction_type;
  @Column({ nullable: false })
  investor_id: string;
  @Column({ nullable: false })
  account_id: string;
  amount = 0.0;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class InvestorAddressEntity {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  address_id: string;
  @Column()
  street: string;
  @Column()
  city: string;
  @Column()
  physical_address: string;
  @Column()
  postal_address: string;
  @Column()
  mobile = false;
  @Column()
  phone = false;
  @Column()
  isActive = false;
  @Column({ nullable: false })
  investor_id: string;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}


