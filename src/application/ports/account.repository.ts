import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../../domain/entities/account.entity';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';

@Injectable()
export class AccountORMRepository implements GenericRepository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async create(account: AccountEntity): Promise<AccountEntity> {
    return this.accountRepository.save(account);
  }

  async findOne(id: string): Promise<AccountEntity | null> {
    return this.accountRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  async update(
    id: string,
    account: Partial<AccountEntity>,
  ): Promise<AccountEntity> {
    await this.accountRepository.update(id, account);
    return this.findOne(id); 
  }

  async remove(id: string): Promise<void> {
    await this.accountRepository.delete(id);
  }

  async save(account: AccountEntity) {
    return this.accountRepository.save(account);
  }
}
