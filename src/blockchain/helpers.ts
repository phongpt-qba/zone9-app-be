import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from 'ethers';

export const getFunctionCallSignature = (name: string) => {
  return keccak256(toUtf8Bytes(name)).slice(0, 10);
};

export const getMysteryBoxExternalUrlFromTokenId = (tokenId: number) => {
  return `${process.env.APP_API_URI}/mystery-box/${tokenId}`;
};
