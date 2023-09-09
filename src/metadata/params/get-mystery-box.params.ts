import { IsNumberString } from 'class-validator';

export class GetMysteryBoxParams {
  @IsNumberString()
  id: number;
}
