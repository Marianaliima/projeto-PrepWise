import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  description: string;
  @Column() topic: string;
}
