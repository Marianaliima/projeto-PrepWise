import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from 'src/interfaces/dtos/create-user.dto';

@Injectable()
export class UserORMRepository implements GenericRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async create(User: CreateUserDto): Promise<UserEntity> {
    return this.UserRepository.save(User);
  }

  // Método para encontrar uma conta específica pelo ID
  async findOne(id: string): Promise<UserEntity | null> {
    return this.UserRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.UserRepository.findOne({ where: { email } });
  }

  // Método para retornar todas as contas
  async findAll(): Promise<UserEntity[]> {
    return this.UserRepository.find();
  }

  // Método para atualizar uma conta específica
  async update(id: string, User: Partial<UserEntity>): Promise<UserEntity> {
    await this.UserRepository.update(id, User);
    return this.findOne(id); // Retorna a conta atualizada
  }

  // Método para remover uma conta específica
  async remove(id: string): Promise<void> {
    await this.UserRepository.delete(id);
  }

  // Método para salvar uma conta
  async save(User: CreateUserDto) {
    return this.UserRepository.save(User);
  }
}
