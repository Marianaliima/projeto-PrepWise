import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import {
  QuestionDto,
  UpdateQuestionDto,
} from 'src/interfaces/dtos/question.dto';
import { QuestionORMRepository } from '../ports/question.repository';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionORMRepository) {}

  async createQuestion(description: string, topic: string) {
    return this.questionRepository.save({
      description,
      topic,
      id: uuidv4(),
    });
  }

  async getQuestionById(id: string): Promise<QuestionDto> {
    if (!isUUID(id)) {
      throw new BadRequestException('ID inválido. O ID deve ser um UUID.');
    }
    const question = await this.questionRepository.findOne(id);
    if (!question) {
      throw new NotFoundException('questão não encontrada.');
    }

    return {
      id: question.id,
      description: question.description,
      topic: question.topic,
    };
  }

  async updateQuestion(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionDto> {
    const question = await this.questionRepository.findOne(id);
    if (!question) {
      throw new NotFoundException('Questão não encontrada.');
    }

    Object.assign(question, updateQuestionDto);
    await this.questionRepository.save(question);

    return {
      id: question.id,
      description: question.description,
      topic: question.topic,
    };
  }

  async deleteQuestion(id: string): Promise<void> {
    try {
      const question = await this.questionRepository.findOne(id);
      if (!question) {
        throw new NotFoundException('Questão não encontrada.');
      }

      await this.questionRepository.remove(question.id);
    } catch (error) {
      throw new BadRequestException(
        'Ocorreu um erro inesperado. Tente novamente.',
      );
    }
  }

  async getAllQuestions(): Promise<QuestionDto[]> {
    const questions = await this.questionRepository.findAll();
    return questions.map((question) => ({
      id: question.id,
      description: question.description,
      topic: question.topic,
    }));
  }
}
