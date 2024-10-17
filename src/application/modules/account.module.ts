import { Module } from '@nestjs/common';
import { AccountController } from '../../adapters/controllers/account.controller';
import { AccountService } from '../services/account.service';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountORMRepository } from '../ports/account.repository';
import { AccountRepository } from '../ports/account-abs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])], 
  controllers: [AccountController],
  providers: [AccountService, {provide: AccountRepository, useClass: AccountORMRepository}],
})
export class AccountModule {}
