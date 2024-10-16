import { AccountEntity } from 'src/domain/entities/account.entity';

export abstract class AccountRepository {
  abstract save(cliente: AccountEntity);

  abstract create(account: AccountEntity): Promise<AccountEntity>;

  abstract findOne(id: string): Promise<AccountEntity | null>;

  abstract findAll(): Promise<AccountEntity[]>;

  abstract update(
    id: string,
    account: Partial<AccountEntity>,
  ): Promise<AccountEntity>;

  abstract remove(id: string): Promise<void>;
}
