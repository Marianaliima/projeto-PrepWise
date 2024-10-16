import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { UserORMRepository } from '../ports/user.respository';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/interfaces/dtos/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserORMRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Esse email já está cadastrado.');
    }

    const user = await this.userRepository.create({
      ...createUserDto,
      id: uuidv4(),
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  async getUserById(id: string): Promise<UserDto> {
    if (!isUUID(id)) {
      throw new BadRequestException('ID inválido. O ID deve ser um UUID.');
    }
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      await this.userRepository.remove(user.id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(
          'Delete sua conta primeiro e assim seu usuário será deletado automaticamente.',
        );
      }
      throw new BadRequestException(
        'Ocorreu um erro inesperado. Tente novamente.',
      );
    }
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    }));
  }
}
