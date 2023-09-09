import { OnchainAssetService } from '@/myria/onchain-asset.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetMysteryBoxParamsDto,
  GetWeaponParamsDto,
} from './params/get-mystery-boxes.params.dto';
import { QueryAssetParamsByOwner } from 'myria-core-sdk/dist/types';

@Injectable()
export class InventoryService {
  constructor(
    private readonly configService: ConfigService,
    private readonly onchainAssetService: OnchainAssetService,
  ) {}

  async getMysteryBoxes(filter: GetMysteryBoxParamsDto) {
    const page = filter.page ? Number(filter.page) : 1;
    const perPage = filter.perPage ? Number(filter.perPage) : 20;
    const payload: QueryAssetParamsByOwner = {
      collectionIds: this.configService.get('MYRIA_MYSTERY_BOX_COLLECTION_ID'),
      starkKey: this.configService.get('STARK_KEY'),
      ownerWalletAddress: this.configService.get('FEE_RECEIPT_ADDRESS'),
      walletAddress: filter.walletAddress,
      page,
      limit: perPage,
    };

    try {
      const response =
        await this.onchainAssetService.queryAssetsByCollectionOwner(payload);

      return {
        total: response?.data?.meta?.totalItems ?? 0,
        page,
        perPage,
        items: response?.data?.items,
      };
    } catch (error) {}

    return {
      total: 0,
      page,
      perPage,
      items: [],
    };
  }

  async getWeapons(filter: GetWeaponParamsDto) {
    const page = filter.page ? Number(filter.page) : 1;
    const perPage = filter.perPage ? Number(filter.perPage) : 20;

    try {
      const response =
        await this.onchainAssetService.queryAssetsByCollectionOwner({
          collectionIds: this.configService.get('MYRIA_WEAPON_COLLECTION_ID'),
          starkKey: this.configService.get('STARK_KEY'),
          ownerWalletAddress: this.configService.get('FEE_RECEIPT_ADDRESS'),
          walletAddress: filter.walletAddress,
          page,
          limit: perPage,
        });

      return {
        total: response?.data?.meta?.totalItems ?? 0,
        page,
        perPage,
        items: response?.data?.items,
      };
    } catch (error) {}

    return {
      total: 0,
      page,
      perPage,
      items: [],
    };
  }
}
