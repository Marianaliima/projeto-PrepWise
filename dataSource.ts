import { AccountEntity } from './src/domain/entities/account.entity';
import { PracticeEntity } from './src/domain/entities/Practice.entity';
import { QuestionEntity } from './src/domain/entities/question.entity';
import { UserEntity } from './src/domain/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres', // ou o tipo de banco que você estiver usando
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Be@triz1',
  database: 'postgres',
  synchronize: false, // geralmente false em produção
  logging: true,
  entities: [UserEntity, QuestionEntity, PracticeEntity, AccountEntity], // adicione suas entidades aqui
  migrations: ['src/migration/**/*.ts'],
});
