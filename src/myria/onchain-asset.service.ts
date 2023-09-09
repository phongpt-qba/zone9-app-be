import { Injectable } from '@nestjs/common';
import {
  AssetOrderBy,
  CollectionByIdDetailsParams,
  CollectionDetailsParams,
  OnchainAssetManager,
  QueryAssetParamsByOwner,
} from 'myria-core-sdk';
import { MyriaModuleFactoryService } from './myria-module-factory.service';

@Injectable()
export class OnchainAssetService {
  private _onchainAssetManager: OnchainAssetManager;

  constructor(
    private readonly myriaModuleFactoryService: MyriaModuleFactoryService,
  ) {
    this._onchainAssetManager =
      myriaModuleFactoryService.getAssetOnchainManager();
  }

  async getNftAssets(starkKey: string) {
    const data = await this._onchainAssetManager.getNftAssets(starkKey);

    return data;
  }

  async getAssetByStarkKey(starkKey: string) {
    const data = await this._onchainAssetManager.getAssetByStarkKey(starkKey);

    return data;
  }

  async getAssetsByCollectionId(
    collectionId: number,
    payload?: Partial<CollectionDetailsParams>,
  ) {
    collectionId = Number(collectionId);

    const formattedPayload = {
      collectionId,
      orderBy: AssetOrderBy.ASC,
      limit: 10,
      page: 1,
      ...(payload || {}),
    };

    const data = await this._onchainAssetManager.getAssetsByCollectionId(
      formattedPayload,
    );

    return data;
  }

  queryAssetsByCollectionOwner(payload: QueryAssetParamsByOwner) {
    return this._onchainAssetManager.queryAssetsByCollectionOwner(payload);
  }

  getAssetsWithFilter(payload: CollectionByIdDetailsParams) {
    return this._onchainAssetManager.getAssetsWithFilter(payload);
  }
}
