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

  async findOne(id: string): Promise<UserEntity | null> {
    return this.UserRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.UserRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.UserRepository.find();
  }

  async update(id: string, User: Partial<UserEntity>): Promise<UserEntity> {
    await this.UserRepository.update(id, User);
    return this.findOne(id); 
  }

  async remove(id: string): Promise<void> {
    await this.UserRepository.delete(id);
  }

  async save(User: CreateUserDto) {
    return this.UserRepository.save(User);
  }
}
