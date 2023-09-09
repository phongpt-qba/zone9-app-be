import { Module } from '@nestjs/common';
import { MysteryBoxController } from './mystery-box.controller';
import { MysteryBoxService } from './mystery-box.service';

@Module({
  controllers: [MysteryBoxController],
  providers: [MysteryBoxService],
})
export class MysteryBoxModule {}
