import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { MintMysteryBoxDto } from './dtos/mint-mystery-box.dto';
import { MintWeaponFromMysteryBoxDto } from './dtos/mint-weapon.dto';
import { MintService } from './mint.service';

dayjs.extend(utc);

@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Post('/mystery-box')
  @HttpCode(HttpStatus.OK)
  async mintMysteryBox(@Body() mintMysteryBoxDto: MintMysteryBoxDto) {
    const startTime = dayjs.unix(1688482800); // Tuesday, July 4, 2023 10:00:00 PM GMT+07:00;
    const now = dayjs();

    if (startTime.isAfter(now)) {
      // throw new ServiceUnavailableException(
      //   `Open mint mystery box at ${startTime
      //     .utc()
      //     .format('YYYY-MM-DD HH:mm:ss')} UTC`,
      // );
    }

    await this.mintService.mintMysteryBox(mintMysteryBoxDto);

    return {
      message: 'ok',
    };
  }

  @Post('/weapon/from-mystery-box')
  async mintWeapon(
    @Body() mintWeaponFromMysteryBoxDto: MintWeaponFromMysteryBoxDto,
  ) {
    const startTime = dayjs.unix(1688655600); // Thursday, July 6, 2023 10:00:00 PM GMT+07:00;
    const now = dayjs();

    if (startTime.isAfter(now)) {
      throw new ServiceUnavailableException(
        `Open mint weapon from mystery box at ${startTime
          .utc()
          .format('YYYY-MM-DD HH:mm:ss')} UTC`,
      );
    }

    return this.mintService.mintWeaponFromMysteryBox(
      mintWeaponFromMysteryBoxDto,
    );
  }
}
