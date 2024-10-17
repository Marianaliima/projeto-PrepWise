import { Expose } from 'class-transformer';

export class QuestionDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  topic: string;

}

export class UpdateQuestionDto {
  descrption?: string;
  topic?: string;
}
