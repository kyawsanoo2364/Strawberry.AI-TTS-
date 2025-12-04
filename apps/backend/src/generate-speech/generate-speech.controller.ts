import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GenerateSpeechService } from './generate-speech.service';
import { GenerateSpeechDto } from './dtos/generate.dto';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role, ROLES } from 'src/auth/decorators/role.decorator';

@Controller('api/ai/speech')
export class GenerateSpeechController {
  constructor(private readonly generateSpeechService: GenerateSpeechService) {}

  @UseGuards(ClerkAuthGuard, RoleGuard)
  @ROLES(Role.ADMIN)
  @Post('standard')
  async generate(
    @Body() generateSpeechDto: GenerateSpeechDto,
    @Res() res: any,
  ) {
    return this.generateSpeechService.generate(generateSpeechDto, res);
  }
}
