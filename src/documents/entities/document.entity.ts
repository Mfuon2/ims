import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Investor } from '../../investors/entities/investor.entity';
import { LocalDateTime } from '@js-joda/core';

@Entity('documents')
export class InvestorDocument {
  @PrimaryGeneratedColumn('uuid')
  document_id: number;
  @Column()
  document_type: string;
  @Column()
  document_url: string;
  @Column({ default: false })
  is_deleted: boolean;
  @CreateDateColumn()
  created_at: LocalDateTime;
  @UpdateDateColumn()
  updated_at: LocalDateTime;

  @ManyToOne(() => Investor, (investor) => investor.documents, {
    onDelete: 'RESTRICT',
  })
  investor: Investor;
}
