import { NftCollectionModule } from '@/nft-collection/nft-collection.module';
import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { MysteryBoxService } from './mystery-box.service';

@Module({
  imports: [NftCollectionModule],
  providers: [BlockchainService, MysteryBoxService],
})
export class BlockchainModule {}
