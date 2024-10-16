import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('practice')
export class PracticeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  solution: string;

  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'varchar', length: 20 })
  status: string; 
}
