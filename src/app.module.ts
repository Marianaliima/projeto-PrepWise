import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { AccountModule } from './application/modules/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountEntity } from './domain/entities/account.entity';
import { UserEntity } from './domain/entities/user.entity';
import { UserModule } from './application/modules/user.module';
import { QuestionEntity } from './domain/entities/question.entity';
import { QuestionModule } from './application/modules/question.module';
import { PracticeModule } from './application/modules/practice.module';
import { PracticeEntity } from './domain/entities/practice.entity';
import { GeminiService } from './application/services/gemini.service';
import { GeminiAdapter } from './infrastructure/gemini/gemini.adapter';
import { GeminiModule } from './application/modules/gemini.module';

config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: String(process.env.DB_PASSWORD),
        database: 'postgres',
        synchronize: false,
        logging: false,
        entities: [AccountEntity, UserEntity, QuestionEntity, PracticeEntity],
      }),
    }),
    AccountModule,
    UserModule,
    QuestionModule,
    PracticeModule,
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
