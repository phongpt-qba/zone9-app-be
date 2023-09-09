import { IsNumberString } from 'class-validator';

export class GetWeaponMetadataParams {
  @IsNumberString()
  tokenId: number;
}
