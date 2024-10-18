import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PracticeEntity } from './practice.entity';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  description: string;
  @Column() topic: string;
  @OneToMany(() => PracticeEntity, (practice) => practice.question)
  practices?: PracticeEntity[];
}
