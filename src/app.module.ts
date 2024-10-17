import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './application/modules/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountEntity } from './domain/entities/account.entity';



@Module({
  imports: [ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService)=>({
          type: 'postgres', 
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: process.env.DB_PASSWORD,
          database: 'postgres',
          synchronize: true,
          logging: false,
          entities: [AccountEntity],
      })
    }), AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
