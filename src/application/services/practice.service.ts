import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PracticeORMRepository } from '../ports/practice.repository';
import { PracticeEntity } from 'src/domain/entities/Practice.entity';
import { CreatePracticeDto } from 'src/interfaces/dtos/practice.dto';
import { QuestionORMRepository } from '../ports/question.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PracticeService {
  constructor(
    @Inject('PracticeRepository')
    private readonly practiceRepository: PracticeORMRepository,

    @Inject('QuestionRepository')
    private readonly questionRepository: QuestionORMRepository,
  ) {}

  async createPractice(practiceData: CreatePracticeDto) {
    const question = await this.questionRepository.findOne(
      practiceData?.question,
    );
    if (!question) {
      throw new NotFoundException('Questão não encontrada.');
    }

    const practice = await this.practiceRepository.create({
      id: uuidv4(),
      solution: practiceData?.solution,
      data: new Date(),
      question: question,
      status: 'Pending',
    });
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
    await this.practiceRepository.remove(practice?.id);
  }
}
