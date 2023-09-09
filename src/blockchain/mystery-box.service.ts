import { PrismaService } from '@/prisma/prisma.service';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Event } from '@ethersproject/contracts';
import { Injectable } from '@nestjs/common';
import { BigNumberish } from 'ethers';
import {
  DEAD_ADDRESS,
  MYSTERY_BOX_FUNCTION_SIGNATURES,
  MysteryBoxAction,
} from './constants';
import { getMysteryBoxExternalUrlFromTokenId } from './helpers';

@Injectable()
export class MysteryBoxService {
  constructor(private readonly prismaService: PrismaService) {}

  async handleTransferTransaction(
    to: string,
    tokenId: BigNumberish,
    event: Event,
  ) {
    console.log('have new transaction');
    console.log('to', to);
    console.log('tokenId', tokenId.toString());
    const onchainTransaction = await event.getTransaction();
    console.log('processing transaction:', onchainTransaction.hash);

    if (
      onchainTransaction.data.includes(MYSTERY_BOX_FUNCTION_SIGNATURES.UNBOX) ||
      to === DEAD_ADDRESS
    ) {
      return this._handleBurnNft(tokenId, onchainTransaction);
    }

    return this._handleTransferTransaction(
      MysteryBoxAction.TRANSFER,
      to,
      tokenId,
      onchainTransaction,
    );
  }

  private async _handleTransferTransaction(
    type: MysteryBoxAction,
    to: string,
    tokenId: BigNumberish,
    onchainTransaction: TransactionResponse,
  ) {
    const formattedTokenId = Number(tokenId.toString());

    await this.prismaService.$transaction(async (tx) => {
      const mysterBoxCollection = await tx.nftCollection.findFirst({
        where: {
          contractAddress: onchainTransaction.to,
        },
        include: {
          baseNftMetadata: true,
        },
      });
      const owner = await tx.user.upsert({
        where: {
          walletAddress: to,
        },
        update: {},
        create: {
          walletAddress: to,
        },
      });
      const maker = await tx.user.upsert({
        where: {
          walletAddress: onchainTransaction.from,
        },
        update: {},
        create: {
          walletAddress: onchainTransaction.from,
        },
      });
      const metadata = await tx.nftMetadata.create({
        data: {
          name: `Mystery Box #${tokenId}`,
          externalUrl: getMysteryBoxExternalUrlFromTokenId(formattedTokenId),
          baseNftMetadataId: mysterBoxCollection?.baseNftMetadata[0]?.id,
        },
      });
      const nft = await tx.nft.upsert({
        include: {
          metadata: true,
        },
        where: {
          tokenId_nftCollectionId: {
            tokenId: formattedTokenId,
            nftCollectionId: mysterBoxCollection.id,
          },
        },
        update: {
          ownerId: owner.id,
        },
        create: {
          tokenId: formattedTokenId,
          nftCollectionId: mysterBoxCollection.id,
          metadataId: metadata.id,
          ownerId: owner.id,
        },
      });
      const transaction = await tx.transaction.upsert({
        where: {
          transactionHash: onchainTransaction.hash,
        },
        update: {},
        create: {
          transactionHash: onchainTransaction.hash,
          type,
          makerId: maker.id,
        },
      });

      await tx.nftsTransactions.upsert({
        where: {
          nftId_transactionId: {
            nftId: nft.id,
            transactionId: transaction.id,
          },
        },
        update: {},
        create: {
          nftId: nft.id,
          transactionId: transaction.id,
        },
      });
    });
  }

  private async _handleBurnNft(
    tokenId: BigNumberish,
    onchainTransaction: TransactionResponse,
  ) {
    const formattedTokenId = Number(tokenId.toString());

    await this.prismaService.$transaction(async (tx) => {
      const mysterBoxCollection = await tx.nftCollection.findFirst({
        where: {
          contractAddress: onchainTransaction.to,
        },
      });

      const nft = await tx.nft.delete({
        where: {
          tokenId_nftCollectionId: {
            tokenId: formattedTokenId,
            nftCollectionId: mysterBoxCollection.id,
          },
        },
      });

      return nft;
    });
  }
}
