import { OnchainAssetService } from '@/myria/onchain-asset.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AssetOrderBy } from 'myria-core-sdk';

@Injectable()
export class TransactionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly onchainService: OnchainAssetService,
  ) {}

  async latest5OpenMysteryBoxTransactions() {
    const response = await this.onchainService.getAssetsWithFilter({
      sortingField: 'createdAt',
      orderBy: AssetOrderBy.DESC,
      collectionId: Number(
        this.configService.get('MYRIA_WEAPON_COLLECTION_ID'),
      ),
    });

    return {
      items: response.data.items,
    };
  }
}
