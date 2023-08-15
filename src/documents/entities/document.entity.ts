import {
  Column,
  CreateDateColumn,
  Entity,
  Generated, ManyToOne,
  ObjectIdColumn, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Investor } from '../../investors/entities/investor.entity';
import { LocalDateTime } from '@js-joda/core';

@Entity('documents')
export class InvestorDocument {
  @PrimaryGeneratedColumn('identity')
  document_id: number;
  @Column()
  document_type: string;
  @Column()
  document_url: string;
  @Column({ default: false })
  is_deleted: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: LocalDateTime;

  @ManyToOne(() => Investor, (investor) => investor.documents, {
    onDelete: 'RESTRICT',
  })
  investor: Investor;
}
