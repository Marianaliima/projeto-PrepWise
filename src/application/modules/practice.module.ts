import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeController } from '../../adapters/controllers/practice.controller';
import { PracticeEntity } from '../../domain/entities/practice.entity';
import { PracticeService } from '../services/practice.service';
import { PracticeORMRepository } from '../ports/practice.repository';
import { QuestionORMRepository } from '../ports/question.repository';
import { QuestionEntity } from '../../domain/entities/question.entity';
import { GeminiModule } from './gemini.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PracticeEntity, QuestionEntity]),
    GeminiModule,
  ],
  controllers: [PracticeController],
  providers: [
    PracticeService,
    { provide: 'PracticeRepository', useClass: PracticeORMRepository },
    { provide: 'QuestionRepository', useClass: QuestionORMRepository },
  ],
})
export class PracticeModule {}
