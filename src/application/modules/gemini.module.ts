import { Module } from '@nestjs/common';
import { GeminiAdapter } from 'src/infrastructure/gemini/gemini.adapter';
import { GeminiService } from '../services/gemini.service';

@Module({
  providers: [GeminiAdapter, GeminiService],
  exports: [GeminiAdapter, GeminiService],  
})
export class GeminiModule {}
