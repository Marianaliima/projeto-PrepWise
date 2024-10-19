import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PracticeService } from '../../application/services/practice.service';
import { PracticeEntity } from '../../domain/entities/practice.entity';
import { CreatePracticeDto } from '../../interfaces/dtos/practice.dto';


@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  async create(
    @Body() practiceData: CreatePracticeDto
  ): Promise<PracticeEntity> {
    return await this.practiceService.createPractice(practiceData);
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
