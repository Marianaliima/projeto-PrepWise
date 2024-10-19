import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionService } from '../../application/services/question.service';
import {
  QuestionDto,
  UpdateQuestionDto,
} from '../../interfaces/dtos/question.dto';

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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.getQuestionById(id);
  }

  @Get()
  async findAll(): Promise<QuestionDto[]> {
    return this.questionService.getAllQuestions();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionDto> {
    return this.questionService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.questionService.deleteQuestion(id);
  }
}
