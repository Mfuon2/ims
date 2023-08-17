import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataEncryptionTransformerConfig } from '../../utils/encryption.config';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { LocalDateTime } from '@js-joda/core';
import { Account } from '../../accounts/entities/account.entity';
import { InvestorDocument } from '../../documents/entities/document.entity';

@Entity('investors')
export class Investor {
  @PrimaryGeneratedColumn('identity')
  investor_id: number;

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
  })
  mobile: string;

  @Column({
    name: 'identity',
    nullable: false,
  })
  identity: string;
  @Column({
    name: 'identity_type',
    nullable: false,
  })
  identity_type: string;

  @Column({ name: 'dob', nullable: false })
  date_of_birth: Date;

  @Column({ name: 'tax_number', nullable: false })
  tax_number: string;
  @Column({ default: false })
  is_deleted: boolean;
  @CreateDateColumn()
  created_at: string;
  @UpdateDateColumn()
  updated_at: LocalDateTime;

  @OneToMany(() => Account, (acc) => acc.investor, { onDelete: 'CASCADE' })
  accounts: Account[];

  @OneToMany(() => InvestorDocument, (doc) => doc.investor ,{ onDelete: 'CASCADE'})
  documents: InvestorDocument[];
}
