import { Module } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { QuestionController } from '../../adapters/controllers/question.controller';
import { QuestionEntity } from 'src/domain/entities/question.entity';
import { QuestionRepository } from '../ports/question-abs.repository';
import { QuestionORMRepository } from '../ports/question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])], 
  providers: [QuestionService, {provide: QuestionRepository, useClass: QuestionORMRepository}],
  controllers: [QuestionController],
})
export class QuestionModule {}
