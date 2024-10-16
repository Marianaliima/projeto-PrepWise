import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  password: string;
}

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export class UpdateUserDto {
  email?: string;
  name?: string;
  passqword?: string;
}
