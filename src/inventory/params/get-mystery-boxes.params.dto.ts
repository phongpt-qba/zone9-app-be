import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetMysteryBoxParamsDto {
  @IsString()
  walletAddress: string;

  @IsNumberString()
  @IsOptional()
  page: number;

  @IsNumberString()
  @IsOptional()
  perPage: number;
}

export class GetWeaponParamsDto {
  @IsString()
  walletAddress: string;

  @IsNumberString()
  @IsOptional()
  page: number;

  @IsNumberString()
  @IsOptional()
  perPage: number;
}
