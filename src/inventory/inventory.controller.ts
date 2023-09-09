import { Controller, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import {
  GetMysteryBoxParamsDto,
  GetWeaponParamsDto,
} from './params/get-mystery-boxes.params.dto';

@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('/mystery-boxes')
  getMysteryBoxes(@Query() params: GetMysteryBoxParamsDto) {
    return this.inventoryService.getMysteryBoxes(params);
  }

  @Get('/weapons')
  getWeapons(@Query() params: GetWeaponParamsDto) {
    return this.inventoryService.getWeapons(params);
  }
}
