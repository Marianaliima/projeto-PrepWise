import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeController } from 'src/adapters/controllers/practice.controller';
import { PracticeEntity } from 'src/domain/entities/Practice.entity';
import { PracticeService } from '../services/practice.service';
import { PracticeORMRepository } from '../ports/practice.repository';
import { QuestionORMRepository } from '../ports/question.repository';
import { QuestionEntity } from 'src/domain/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PracticeEntity, QuestionEntity])],
  controllers: [PracticeController],
  providers: [
    PracticeService,
    { provide: 'PracticeRepository', useClass: PracticeORMRepository },
    { provide: 'QuestionRepository', useClass: QuestionORMRepository },
  ],
})
export class PracticeModule {}
