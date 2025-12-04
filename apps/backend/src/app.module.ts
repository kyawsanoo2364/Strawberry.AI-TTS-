import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GenerateSpeechModule } from './generate-speech/generate-speech.module';
import { TtsModule } from './tts/tts.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, GenerateSpeechModule, TtsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
