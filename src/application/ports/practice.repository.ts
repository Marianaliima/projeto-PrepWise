import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { PracticeEntity } from 'src/domain/entities/Practice.entity';
import { CreatePracticeDto } from 'src/interfaces/dtos/create-Practice.dto';

@Injectable()
export class PracticeORMRepository
  implements GenericRepository<PracticeEntity>
{
  constructor(
    @InjectRepository(PracticeEntity)
    private PracticeRepository: Repository<PracticeEntity>,
  ) {}

  async create(Practice: CreatePracticeDto): Promise<PracticeEntity> {
    return this.PracticeRepository.save(Practice);
  }

  async findOne(id: string): Promise<PracticeEntity | null> {
    return this.PracticeRepository.findOne({ where: { id } });
  }


  async findAll(): Promise<PracticeEntity[]> {
    return this.PracticeRepository.find();
  }

  async update(
    id: string,
    Practice: Partial<PracticeEntity>,
  ): Promise<PracticeEntity> {
    await this.PracticeRepository.update(id, Practice);
    return this.findOne(id); 
  }

  async remove(id: string): Promise<void> {
    await this.PracticeRepository.delete(id);
  }

  async save(Practice: CreatePracticeDto) {
    return this.PracticeRepository.save(Practice);
  }
}
