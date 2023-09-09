import { getFunctionCallSignature } from './helpers';

export enum MysteryBoxAction {
  MINT = 'MINT',
  TRANSFER = 'TRANSFER',
  UNBOX = 'UNBOX',
}

export const MYSTERY_BOX_FUNCTION_SIGNATURES = {
  MINT: getFunctionCallSignature('mint()'),
  UNBOX: getFunctionCallSignature('unbox(uint256)'),
};

export const DEAD_ADDRESS = '0x0000000000000000000000000000000000000000';
