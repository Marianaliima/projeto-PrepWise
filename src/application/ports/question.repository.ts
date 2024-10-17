import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from 'src/domain/entities/question.entity';
import { GenericRepository } from './generic.repository';

@Injectable()
export class QuestionORMRepository
  implements GenericRepository<QuestionEntity>
{
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  create(entity: QuestionEntity): Promise<QuestionEntity> {
    throw new Error('Method not implemented.');
  }

  async save(question: QuestionEntity) {
    return this.questionRepository.save(question);
  }

  async findOne(id: string): Promise<QuestionEntity | null> {
    return this.questionRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<QuestionEntity[]> {
    return this.questionRepository.find();
  }

  async update(
    id: string,
    question: Partial<QuestionEntity>,
  ): Promise<QuestionEntity> {
    await this.questionRepository.update(id, question);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
