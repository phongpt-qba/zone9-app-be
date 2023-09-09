import { Controller, Get } from '@nestjs/common';
import { MysteryBoxService } from './mystery-box.service';

@Controller('mystery-boxes')
export class MysteryBoxController {
  constructor(private readonly mysteryBoxService: MysteryBoxService) {}

  @Get('/opened-count')
  getOpenedBoxCount() {
    return this.mysteryBoxService.getOpenedBoxCount();
  }
}
