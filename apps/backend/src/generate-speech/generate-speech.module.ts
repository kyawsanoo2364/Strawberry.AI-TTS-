import { Module } from '@nestjs/common';
import { GenerateSpeechController } from './generate-speech.controller';
import { GenerateSpeechService } from './generate-speech.service';
import { TtsModule } from 'src/tts/tts.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TtsModule, AuthModule],
  controllers: [GenerateSpeechController],
  providers: [GenerateSpeechService],
})
export class GenerateSpeechModule {}
