import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
export class InvestorDocument {
  @ObjectIdColumn({ unique: true })
  @Generated('uuid')
  document_id: string;
  @Column()
  document_type: string;
  @Column({ nullable: false })
  investor_id: string;
  @Column()
  document_url: string;
  @Column({ default: false })
  isDeleted = false;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
