import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EnvTypes,
  FeeType,
  MintERC721Params,
  MintingManager,
} from 'myria-core-sdk';
import * as uuidv4 from 'uuid4';

@Injectable()
export class MintService {
  private _mintingManager: MintingManager;

  constructor(private readonly configService: ConfigService) {
    const env =
      configService.get('NETWORK') === 'mainnet'
        ? EnvTypes.PRODUCTION
        : EnvTypes.STAGING;

    this._mintingManager = new MintingManager(env);
  }

  async mintMysteryBox(tokenId: string, description: string) {
    tokenId = tokenId.toString();

    const params: MintERC721Params = {
      requestId: uuidv4(),
      requestDescription: `Mint mystery box request for token ${tokenId}`,
      partnerRefId: this.configService.get('PROJECT_ID'),
      starkKey: this.configService.get('STARK_KEY'),
      contractAddress: this.configService.get('MYSTERY_BOX_ADDRESS'),
      uri: `${this.configService.get(
        'MYSTERY_BOX_BASE_METADATA_URI',
      )}/${tokenId}`,
      tokenId,
      description,
      fees: [
        {
          percentage: 5,
          receiptAddress: this.configService.get('FEE_RECEIPT_ADDRESS'),
          feeType: FeeType.ROYALTY,
        },
      ],
    };

    console.log('Initiating a mint transaction...');
    const mintTransactionResponse =
      await this._mintingManager.createMintTransactionERC721(params);

    return mintTransactionResponse;
  }

  async mintWeapon(tokenId: string, description: string) {
    tokenId = tokenId.toString();

    const params: MintERC721Params = {
      requestId: uuidv4(),
      requestDescription: `Mint weapon ${tokenId} from mystery box request`,
      partnerRefId: this.configService.get('PROJECT_ID'),
      starkKey: this.configService.get('STARK_KEY'),
      contractAddress: this.configService.get('WEAPON_CONTRACT_ADDRESS'),
      uri: `${this.configService.get('WEAPON_BASE_METADATA_URI')}/${tokenId}`,
      tokenId,
      description,
      fees: [
        {
          percentage: 5,
          receiptAddress: this.configService.get('FEE_RECEIPT_ADDRESS'),
          feeType: FeeType.ROYALTY,
        },
      ],
    };

    console.log('Initiating a mint transaction...');
    const mintTransactionResponse =
      await this._mintingManager.createMintTransactionERC721(params);

    return mintTransactionResponse;
  }
}
