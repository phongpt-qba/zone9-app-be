import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeveloperAccountManager, EnvTypes } from 'myria-core-sdk';

@Injectable()
export class MyriaDeveloperAccountService extends DeveloperAccountManager {
  constructor(private readonly configService: ConfigService) {
    super(
      configService.get('NETWORK') === 'mainnet'
        ? EnvTypes.PRODUCTION
        : EnvTypes.STAGING,
    );
  }
}
