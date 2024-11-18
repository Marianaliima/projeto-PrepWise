import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { PracticeService } from '../../application/services/practice.service';
import { PracticeEntity } from '../../domain/entities/practice.entity';
import { AudioGenerator } from '../../interfaces/audio-generator.interface';
import { CreatePracticeDto } from '../../interfaces/dtos/practice.dto';
import { GoogleCloudTextToSpeechAdapter } from 'src/infrastructure/texttospeech/texttospeech.adapter';

@Controller('practice')
export class PracticeController {
  constructor(
    private readonly practiceService: PracticeService,
    private readonly audioGenerator: GoogleCloudTextToSpeechAdapter,
  ) {}

  @Post()
  async create(
    @Body() practiceData: CreatePracticeDto,
    @Res() response,
  ): Promise<PracticeEntity | Response | BadRequestException> {
    const practice = await this.practiceService.createPractice(practiceData);

    if (!practice) {
      return new BadRequestException('Erro ao criar a prática');
    }

    try {
      const audioBuffer = await this.audioGenerator.generateAudio(
        this.practiceService.cleanMarkdown(practice.feedback),
      );
      response.set('Content-Type', 'audio/mpeg');
      response.send(audioBuffer);
      return null; 
    } catch (error) {
      console.error(error);
      response.status(500).send('Erro ao gerar o áudio');
      return practice; 
    }
  }

  @Get()
  async findAll(): Promise<PracticeEntity[]> {
    return await this.practiceService.findAllPractices();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PracticeEntity> {
    return await this.practiceService.findPracticeById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() practiceData: Partial<PracticeEntity>,
  ): Promise<PracticeEntity> {
    return await this.practiceService.updatePractice(id, practiceData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.practiceService.deletePractice(id);
  }
}
