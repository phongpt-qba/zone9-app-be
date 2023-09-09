import { Global, Module } from '@nestjs/common';
import { MintService } from './mint.service';
import { MyriaClientService } from './myria-client.service';
import { MyriaModuleFactoryService } from './myria-module-factory.service';
import { MyriaDeveloperAccountService } from './myria-developer-account.service';
import { OnchainAssetService } from './onchain-asset.service';
import { TransactionService } from './transaction.service';

@Global()
@Module({
  providers: [
    MyriaClientService,
    MyriaModuleFactoryService,
    MyriaDeveloperAccountService,
    MintService,
    TransactionService,
    OnchainAssetService,
  ],
  exports: [
    MyriaClientService,
    MyriaModuleFactoryService,
    MyriaDeveloperAccountService,
    MintService,
    TransactionService,
    OnchainAssetService,
  ],
})
export class MyriaModule {}
