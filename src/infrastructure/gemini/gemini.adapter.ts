import { Injectable } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class GeminiAdapter {
  private apiKey: string;
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.apiKey = process.env.API_KEY_BEA;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
  }

  async sendToGemini(prompt: string): Promise<string> {
    const chat = this.model.startChat({
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.response.text();
  }
}
