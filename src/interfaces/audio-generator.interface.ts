export interface AudioGenerator {
  generateAudio(text: string): Promise<Buffer | string | Uint8Array>;
}
