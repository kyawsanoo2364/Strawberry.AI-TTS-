import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GenerateSpeechDto } from './dtos/generate.dto';
import { TtsService } from 'src/tts/tts.service';
import { Response } from 'express';

// Helper function to generate a random break tag
const randomBreak = (min: number, max: number): string =>
  `<break time="${Math.floor(Math.random() * (max - min + 1)) + min}ms"/>`;

// Define standard break lengths for clarity
const INTER_WORD_BREAK = randomBreak(100, 200); // Shortest pause
const PHRASE_BREAK = randomBreak(250, 400); // Comma equivalent (for '၊')
const SENTENCE_BREAK = randomBreak(600, 800); // Full stop equivalent (for '.' and '။')

@Injectable()
export class GenerateSpeechService {
  constructor(private readonly ttsService: TtsService) {}

  async generate(generateSpeechDto: GenerateSpeechDto, res: Response) {
    let ssml = generateSpeechDto.text;

    // Handle Punctuation Pauses (Longer breaks for sentence stops)
    // CRITICAL FIX: The Burmese comma '၊' should typically have a shorter pause
    // than the full stop '။' for natural rhythm.
    ssml = ssml
      .replaceAll('။', SENTENCE_BREAK) // Full Stop: Longer pause (600-800ms)
      .replaceAll('.', SENTENCE_BREAK) // Standard Stop: Longer pause (600-800ms)
      .replaceAll('၊', PHRASE_BREAK); // Burmese Comma: Medium pause (250-400ms)

    // Replace spaces ONLY between words (avoid replacing inside <break> tags)
    // The previous range of 100-300ms is fine, but reducing the max to 200ms
    // makes the flow more natural for simple spaces.
    ssml = ssml.replace(/ (?=[^>]*(?:<|$))/g, INTER_WORD_BREAK);

    // 3. CRITICAL FIX: Wrap the entire result in the <speak> root tag
    ssml = `<speak>${ssml}</speak>`; // All SSML content MUST be wrapped in <speak>
    try {
      const buffer = await this.ttsService.generateAudioBuffer(ssml);
      res.setHeader('Content-Type', 'audio/mp3');
      res.setHeader(
        'Content-Disposition',
        `inline; filename="${new Date().toISOString()}.mp3"`,
      );
      res.setHeader('Content-Length', buffer.length);
      return res.send(buffer);
    } catch (error) {
      console.error('TTS synthesis failed:', error);
      // Use standard NestJS exception handling
      throw new InternalServerErrorException(
        'Could not generate speech audio.',
      );
    }
  }
}
