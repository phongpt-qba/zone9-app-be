import { IsString } from 'class-validator';

export class MintMysteryBoxDto {
  @IsString()
  signature: string;
}
