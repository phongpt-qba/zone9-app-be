import { IsNumberString, IsString } from 'class-validator';

export class MintWeaponFromMysteryBoxDto {
  @IsString()
  walletAddress: string;

  @IsString()
  starkKey: string;

  @IsNumberString()
  mysteryBoxTokenId: string;
}
