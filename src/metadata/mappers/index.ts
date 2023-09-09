import {
  BaseNftMetadata,
  MyriaMysteryBox,
  Nft,
  NftMetadata,
} from '@prisma/client';

export const myriaBoxToMetadataMapper = (
  nft: MyriaMysteryBox & {
    nftMetadata: NftMetadata & {
      baseNftMetadata: BaseNftMetadata;
    };
  },
) => {
  return {
    name: nft.nftMetadata?.name,
    external_url: nft.nftMetadata?.externalUrl,
    image: nft.nftMetadata?.baseNftMetadata.image,
    description: nft.nftMetadata?.baseNftMetadata?.description,
    animation_url: nft.nftMetadata?.baseNftMetadata?.animationUrl,
    attributes: nft.nftMetadata?.baseNftMetadata?.attributes || [],
  };
};

export const nftToMetadataMapper = (
  nft: Nft & {
    metadata: NftMetadata & {
      baseNftMetadata: BaseNftMetadata;
    };
  },
  tokenId: number,
) => {
  const typeAttribute = (
    nft?.metadata?.baseNftMetadata?.attributes as any[]
  )?.find((type) => type.trait_type === 'type');
  const rankAttribute = (
    nft?.metadata?.baseNftMetadata?.attributes as any[]
  )?.find((type) => type.trait_type === 'rank');

  return {
    name: `${nft.metadata?.name} #${tokenId}`,
    external_url: nft.metadata?.externalUrl,
    image: nft.metadata?.baseNftMetadata.image,
    description: nft.metadata?.baseNftMetadata?.description,
    animation_url: nft.metadata?.baseNftMetadata?.animationUrl,
    attributes: nft.metadata?.baseNftMetadata?.attributes || [],
    type: typeAttribute?.value,
    rank: rankAttribute?.value,
  };
};
