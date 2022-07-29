import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, BaseEntity, Column } from 'typeorm';

export abstract class AuditFields extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('boolean', {default: true})
  isActive: boolean;
}
