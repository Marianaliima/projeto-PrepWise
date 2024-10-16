// src/interfaces/dtos/user.dto.ts
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}

export class CreateUserDto {
  email: string;
  name: string;
}

export class UpdateUserDto {
  email?: string;
  name?: string;
}
