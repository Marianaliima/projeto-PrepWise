import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from 'src/application/services/question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  createQuestion(
    @Body('description') description: string,
    @Body('topic') topic: string,
  ) {
    return this.questionService.createQuestion(description, topic);
  }
}
