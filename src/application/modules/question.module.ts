import { Module } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { QuestionController } from '../../adapters/controllers/question.controller';
import { QuestionEntity } from 'src/domain/entities/question.entity';
import { QuestionORMRepository } from '../ports/question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])], 
  controllers: [QuestionController],
  providers: [
    QuestionService, 
    QuestionORMRepository, 
    { provide: 'QuestionRepository', useClass: QuestionORMRepository }
  ],
  exports: ['QuestionRepository'], 
})
export class QuestionModule {}