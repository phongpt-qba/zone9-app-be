import { Module } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';

@Module({
  providers: [NftCollectionService],
  exports: [NftCollectionService],
})
export class NftCollectionModule {}
