import { Injectable } from '@nestjs/common';
import { GeminiAdapter } from '../../infrastructure/gemini/gemini.adapter';

@Injectable()
export class GeminiService {
  constructor(private readonly geminiAdapter: GeminiAdapter) {}

  async processPrompt(questao: string, solution: string): Promise<string> {
    const prompt = `
      Você é o Gemini, um assistente que está entrevistando um usuário para uma vaga tech, o usuário deve resolver uma questão 
      de programação. O usuário te informou a questão que ele quer resolver e é a seguinte: "${questao}".      
      Aqui está a solução do usuário:
      "${solution}" Você deve dar um feedback para ele sobre a solução dele.`;

    return this.geminiAdapter.sendToGemini(prompt);
  }
}
