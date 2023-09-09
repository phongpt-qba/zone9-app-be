import { Controller, Get, Param } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { GetMysteryBoxParams } from './params/get-mystery-box.params';
import { GetWeaponMetadataParams } from './params/get-weapon-metadata-params';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('/mystery-box/:id')
  getMysteryBoxMetadata(@Param() params: GetMysteryBoxParams) {
    return this.metadataService.getMysteryBoxMetadata(params.id);
  }

  @Get('/weapon/:tokenId')
  getWeaponMetadata(@Param() params: GetWeaponMetadataParams) {
    return this.metadataService.getWeaponMetadata(params.tokenId);
  }
}
