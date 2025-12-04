import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateSpeechDto {
  @IsString()
  @IsNotEmpty()
  text!: string;
}
