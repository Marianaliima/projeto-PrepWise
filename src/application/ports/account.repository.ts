import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/domain/entities/account.entity';
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

  // Método para encontrar uma conta específica pelo ID
  async findOne(id: string): Promise<AccountEntity | null> {
    return this.accountRepository.findOne({ where: { id } });
  }

  // Método para retornar todas as contas
  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  // Método para atualizar uma conta específica
  async update(
    id: string,
    account: Partial<AccountEntity>,
  ): Promise<AccountEntity> {
    await this.accountRepository.update(id, account);
    return this.findOne(id); // Retorna a conta atualizada
  }

  // Método para remover uma conta específica
  async remove(id: string): Promise<void> {
    await this.accountRepository.delete(id);
  }

  // Método para salvar uma conta
  async save(account: AccountEntity) {
    return this.accountRepository.save(account);
  }
}
