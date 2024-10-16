import { AccountEntity } from 'src/domain/entities/account.entity';

export abstract class AccountRepository {
  abstract save(cliente: AccountEntity);

  // Método para criar uma nova conta
  abstract create(account: AccountEntity): Promise<AccountEntity>;

  // Método para encontrar uma conta pelo ID
  abstract findOne(id: string): Promise<AccountEntity | null>;

  // Método para encontrar todas as contas
  abstract findAll(): Promise<AccountEntity[]>;

  // Método para atualizar uma conta
  abstract update(
    id: string,
    account: Partial<AccountEntity>,
  ): Promise<AccountEntity>;

  // Método para remover uma conta
  abstract remove(id: string): Promise<void>;
}
