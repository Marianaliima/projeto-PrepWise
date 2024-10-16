import { Module } from '@nestjs/common';
import { AccountController } from '../../adapters/controllers/account.controller';
import { AccountService } from '../services/account.service';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountORMRepository } from '../ports/account.repository';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), UserModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    { provide: 'AccountRepository', useClass: AccountORMRepository },
  ],
})
export class AccountModule {}
