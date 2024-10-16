import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './application/modules/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountEntity } from './domain/entities/account.entity';
import { UserEntity } from './domain/entities/user.entity';
import { UserModule } from './application/modules/user.module';
import { QuestionModule } from './application/modules/question.module';
import { QuestionEntity } from './domain/entities/question.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'postgres',
        synchronize: true,
        logging: false,
        entities: [AccountEntity, UserEntity, QuestionEntity],
      }),
    }),
    AccountModule,
    UserModule,

    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
