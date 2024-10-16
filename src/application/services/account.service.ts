import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAccountDto } from 'src/interfaces/dtos/create-account.dto';
import { AccountORMRepository } from '../ports/account.repository';
import { UserORMRepository } from '../ports/user.respository';

@Injectable()
export class AccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountORMRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserORMRepository,
  ) {}
  async createAccount(createAccountDto: CreateAccountDto) {
    const existingUser = await this.userRepository.findByEmail(
      createAccountDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Esse email já está cadastrado.');
    }
    const user = await this.userRepository.create({
      email: createAccountDto.email,
      name: createAccountDto.name,
      password: createAccountDto.password,
      id: uuidv4(),
    });
    await this.userRepository.save(user);

    const account = await this.accountRepository.create({
      user: user,
      id: uuidv4(),
      userId: user.id,
      createdAt: new Date(),
    });
    await this.accountRepository.save(account);
    user.account = account; 
    await this.userRepository.save(user); 
    return {
      id: account.id,
      password: user.password,
      email: user.email,
      name: user.name,
    };
  }
}
