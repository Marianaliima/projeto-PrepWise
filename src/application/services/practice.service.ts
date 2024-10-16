import { Injectable, NotFoundException } from '@nestjs/common';
import { PracticeEntity } from '../entities/practice.entity';
import { PracticeORMRepository } from '../ports/practice.repository';

@Injectable()
export class PracticeService {
  constructor(private readonly practiceRepository: PracticeORMRepository) {}

  async createPractice(
    practiceData: Partial<PracticeEntity>,
  ): Promise<PracticeEntity> {
    const practice = this.practiceRepository.create(practiceData);
    return await this.practiceRepository.save(practice);
  }

  async findAllPractices(): Promise<PracticeEntity[]> {
    return await this.practiceRepository.findAll();
  }

  async findPracticeById(id: string): Promise<PracticeEntity> {
    const practice = await this.practiceRepository.findOne(id);
    if (!practice) {
      throw new NotFoundException('Practice não encontrado.');
    }
    return practice;
  }

  async updatePractice(
    id: string,
    practiceData: Partial<PracticeEntity>,
  ): Promise<PracticeEntity> {
    await this.findPracticeById(id); 
    await this.practiceRepository.update(id, practiceData);
    return this.findPracticeById(id); 
  }

  async deletePractice(id: string): Promise<void> {
    const practice = await this.findPracticeById(id);
    await this.practiceRepository.remove(practice);
  }
}
