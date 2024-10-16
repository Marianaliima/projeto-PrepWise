import { Expose } from 'class-transformer';

export class AccountDto {
  @Expose()
  id: string;

  @Expose()
  password: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
