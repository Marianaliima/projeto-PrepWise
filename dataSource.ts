import { AccountEntity } from './src/domain/entities/account.entity';
import { config } from 'dotenv';
import { PracticeEntity } from './src/domain/entities/practice.entity';
import { QuestionEntity } from './src/domain/entities/question.entity';
import { UserEntity } from './src/domain/entities/user.entity';
import { DataSource } from 'typeorm';
import {CreateQuestionsAndPracticeTablests1729180467496 } from './src/migrations/1729180467496-CreateQuestionsAndPracticeTables';



config();
export const AppDataSource = new DataSource({
  type: 'postgres', 
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: String(process.env.DB_PASSWORD),
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: [UserEntity, QuestionEntity, PracticeEntity, AccountEntity], 
  migrations: [CreateQuestionsAndPracticeTablests1729180467496],
});
