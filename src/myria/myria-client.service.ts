import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvTypes, MyriaClient, Network } from 'myria-core-sdk';

@Injectable()
export class MyriaClientService extends MyriaClient {
  constructor(private readonly configService: ConfigService) {
    super({
      provider: null,
      networkId:
        configService.get('NETWORK') === 'mainnet'
          ? Network.MAINNET
          : Network.GOERLI,
      web3: null,
      env:
        configService.get('NETWORK') === 'mainnet'
          ? EnvTypes.PRODUCTION
          : EnvTypes.STAGING,
    });
  }
}
