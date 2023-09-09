import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonModule } from 'nest-winston';
import {
  BINANCE_NETWORK,
  BINANCE_TESTNET_NETWORK,
  EthersModule,
} from 'nestjs-ethers';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { InventoryModule } from './inventory/inventory.module';
import { MetadataModule } from './metadata/metadata.module';
import { MintModule } from './mint/mint.module';
import { MyriaModule } from './myria/myria.module';
import { MysteryBoxModule } from './mystery-box/mystery-box.module';
import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { NftModule } from './nft/nft.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { WeaponModule } from './weapon/weapon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({}),
    PrismaModule,
    EventEmitterModule.forRoot(),
    EthersModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          network:
            config.get('NETWORK') === 'mainnet'
              ? BINANCE_NETWORK
              : BINANCE_TESTNET_NETWORK,
          // custom: config.get('JSON_RPC_PROVIDER'),
        };
      },
    }),
    BlockchainModule,
    MetadataModule,
    NftModule,
    TransactionModule,
    NftCollectionModule,
    MintModule,
    MyriaModule,
    InventoryModule,
    UserModule,
    WeaponModule,
    MysteryBoxModule,
  ],
  providers: [AppService],
})
export class AppModule {}
