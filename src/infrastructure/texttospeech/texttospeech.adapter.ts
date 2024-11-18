import { Injectable } from '@nestjs/common';
import { protos, TextToSpeechClient } from '@google-cloud/text-to-speech';
import { AudioGenerator } from 'src/interfaces/audio-generator.interface';
import * as fs from 'fs';
import * as util from 'util';

@Injectable()
export class GoogleCloudTextToSpeechAdapter implements AudioGenerator {

  constructor() {}

  async generateAudio(text: string): Promise<Buffer | string | Uint8Array> {
    console.log(text)
    const client = new TextToSpeechClient();
    const request: protos.google.cloud.texttospeech.v1.SynthesizeSpeechRequest =
      {
        input: {
          text: text,
        },
        voice: {
          languageCode: 'pt-BR', 
          // ssmlGender: 'NEUTRAL',
          ssmlGender:
            protos.google.cloud.texttospeech.v1.SsmlVoiceGender.NEUTRAL, 
        },
        audioConfig: {
          audioEncoding: 'MP3',
        },
        toJSON: function (): { [k: string]: any } {
          throw new Error('Function not implemented.');
        },
      };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    // console.log('Audio content written to file: output.mp3');
    return response.audioContent;
  }
}
