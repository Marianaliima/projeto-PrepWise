import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string; 

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
