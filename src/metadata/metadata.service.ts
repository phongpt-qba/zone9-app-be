import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { myriaBoxToMetadataMapper, nftToMetadataMapper } from './mappers';

@Injectable()
export class MetadataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getMysteryBoxMetadata(id: number) {
    const collection = await this.prismaService.nftCollection.findUnique({
      where: {
        contractAddress: this.configService.get('MYSTERY_BOX_ADDRESS'),
      },
    });

    if (!collection) {
      throw new NotFoundException('Collection does not exist');
    }

    const myriaMysteryBox = await this.prismaService.myriaMysteryBox.findUnique(
      {
        where: {
          nftCollectionId_tokenId: {
            nftCollectionId: collection.id,
            tokenId: Number(id),
          },
        },
        include: {
          nftMetadata: {
            include: {
              baseNftMetadata: true,
            },
          },
        },
      },
    );

    if (!myriaMysteryBox) {
      throw new NotFoundException('NFT does not exist');
    }

    return myriaBoxToMetadataMapper(myriaMysteryBox);
  }

  async getWeaponMetadata(tokenId: number) {
    tokenId = Number(tokenId);

    const collection = await this.prismaService.nftCollection.findUnique({
      where: {
        contractAddress: this.configService.get('WEAPON_CONTRACT_ADDRESS'),
      },
    });

    if (!collection) {
      throw new NotFoundException('Collection does not exist');
    }

    const nft = await this.prismaService.nft.findUnique({
      where: {
        tokenId_nftCollectionId: {
          tokenId,
          nftCollectionId: collection.id,
        },
      },
      include: {
        metadata: {
          include: {
            baseNftMetadata: true,
          },
        },
      },
    });

    if (!nft) {
      throw new NotFoundException('NFT does not exist');
    }

    return nftToMetadataMapper(nft, tokenId);
  }
}
