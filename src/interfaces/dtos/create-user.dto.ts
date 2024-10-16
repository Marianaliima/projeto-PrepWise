import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string; 

  @IsString()
  @IsNotEmpty()
  name: string;
  id:string
}
