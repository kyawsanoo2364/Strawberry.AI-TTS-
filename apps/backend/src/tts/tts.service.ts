import { Injectable } from '@nestjs/common';
import textToSpeech, { TextToSpeechClient } from '@google-cloud/text-to-speech';

@Injectable()
export class TtsService {
  private readonly client: TextToSpeechClient;

  constructor() {
    this.client = new textToSpeech.TextToSpeechClient({
      apiKey: process.env.GOOGLE_CLOUD_TTS_API_KEY,
    });
  }

  async generateAudioBuffer(
    ssml: string,
    rate: number = 0.9,
    pitch: number = 0.2,
  ) {
    const [response] = await this.client.synthesizeSpeech({
      input: {
        ssml,
      },
      voice: {
        languageCode: 'my-MM',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: rate,
        pitch: pitch,
      },
    });

    return response.audioContent as Buffer;
  }
}
