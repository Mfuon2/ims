import {
  BeforeUpdate,
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

  @Column({
    name: 'code',
    nullable: false,
  })
  code: string;

  @Column({ name: 'email' })
  email: string;
  @Column({
    name: 'mobile',
    unique: true,
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
  @Column({ default: false })
  is_deleted = false;
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
