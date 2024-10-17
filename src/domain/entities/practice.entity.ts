import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('practice')
export class PracticeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  solution: string;

  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'text', nullable: true })
  feedback?: string;

  @Column({ type: 'varchar', length: 20 })
  status?: string;
  @ManyToOne(() => QuestionEntity, (question) => question.practices, {
    eager: true,
  })
  question: QuestionEntity;
}
