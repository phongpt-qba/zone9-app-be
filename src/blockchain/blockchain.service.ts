import * as mysteryBoxABI from '@abis/mystery-box.abi.json';
import { Contract, Event } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigNumberish } from 'ethers';
import {
  EthersContract,
  EthersSigner,
  InjectContractProvider,
  InjectSignerProvider,
} from 'nestjs-ethers';
import { MysteryBoxService } from './mystery-box.service';

@Injectable()
export class BlockchainService {
  private _wallet: Wallet;

  constructor(
    @InjectContractProvider()
    private readonly ethersContract: EthersContract,
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
    private readonly configService: ConfigService,
    private readonly mysteryBoxService: MysteryBoxService,
  ) {
    this._wallet = this.ethersSigner.createWallet(
      configService.get('WALLET_PRIVATE_KEY'),
    );
  }

  async connectAndListen() {
    // this._listenMysteryBoxEvents();
  }

  private async _listenMysteryBoxEvents() {
    const contractAddress = this.configService.get('MYSTERY_BOX_ADDRESS');
    const contract: Contract = this.ethersContract.create(
      contractAddress,
      mysteryBoxABI,
      this._wallet,
    );

    contract.on(
      'Transfer',
      (_from: string, to: string, tokenId: BigNumberish, event: Event) => {
        return this.mysteryBoxService.handleTransferTransaction(
          to,
          tokenId,
          event,
        );
      },
    );
  }
}

// 0x0000000000000000000000000000000000000000 0x26783c189100BDb9e3B353dBb8F1966F01b2Dc7b BigNumber { _hex: '0x05', _isBigNumber: true } 5
// {
//   blockNumber: 30564110,
//   blockHash: '0xaea0929dd4b1e2ebb09a95b859a049b642b7e39b38ac869675407e3f80bb25c0',
//   transactionIndex: 4,
//   removed: false,
//   address: '0x7dFA5DdcAA9084E6e6EE4F80F24261fBABCbe32d',
//   data: '0x',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x0000000000000000000000000000000000000000000000000000000000000000',
//     '0x00000000000000000000000026783c189100bdb9e3b353dbb8f1966f01b2dc7b',
//     '0x0000000000000000000000000000000000000000000000000000000000000005'
//   ],
//   transactionHash: '0xabcd56811a4c527e6dd412625ef3d067836a3ca549da4a59984acbf57a1b7f75',
//   logIndex: 16,
//   removeListener: [Function (anonymous)],
//   getBlock: [Function (anonymous)],
//   getTransaction: [Function (anonymous)],
//   getTransactionReceipt: [Function (anonymous)],
//   event: 'Transfer',
//   eventSignature: 'Transfer(address,address,uint256)',
//   decode: [Function (anonymous)],
//   args: [
//     '0x0000000000000000000000000000000000000000',
//     '0x26783c189100BDb9e3B353dBb8F1966F01b2Dc7b',
//     BigNumber { _hex: '0x05', _isBigNumber: true },
//     from: '0x0000000000000000000000000000000000000000',
//     to: '0x26783c189100BDb9e3B353dBb8F1966F01b2Dc7b',
//     tokenId: BigNumber { _hex: '0x05', _isBigNumber: true }
//   ]
// }
// {
//   hash: '0xabcd56811a4c527e6dd412625ef3d067836a3ca549da4a59984acbf57a1b7f75',
//   type: 0,
//   accessList: null,
//   blockHash: '0xaea0929dd4b1e2ebb09a95b859a049b642b7e39b38ac869675407e3f80bb25c0',
//   blockNumber: 30564110,
//   transactionIndex: 4,
//   confirmations: 3,
//   from: '0x26783c189100BDb9e3B353dBb8F1966F01b2Dc7b',
//   gasPrice: BigNumber { _hex: '0x072fdb6699', _isBigNumber: true },
//   gasLimit: BigNumber { _hex: '0x0270ae', _isBigNumber: true },
//   to: '0x7dFA5DdcAA9084E6e6EE4F80F24261fBABCbe32d',
//   value: BigNumber { _hex: '0x00', _isBigNumber: true },
//   nonce: 499,
//   data: '0x1249c58b',
//   r: '0x711eef265e13b2c27e7c14621d25bb3bb16aec34048d0ed77b170a23b5ff940a',
//   s: '0x7a86d912357008da184017a12633139b9ce356220474c25ebded569a253b18a3',
//   v: 230,
//   creates: null,
//   chainId: 97,
//   wait: [Function (anonymous)]
// }
// {
//   to: '0x7dFA5DdcAA9084E6e6EE4F80F24261fBABCbe32d',
//   from: '0x26783c189100BDb9e3B353dBb8F1966F01b2Dc7b',
//   contractAddress: null,
//   transactionIndex: 4,
//   gasUsed: BigNumber { _hex: '0x0270ae', _isBigNumber: true },
//   logsBloom: '0x00000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000008000000000000000000000000000000000000000000000000020000000000000000000800000000000000000000000010000010000000000000000000000000000000001000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000040000000000000000000000000040000020000000000000000000400000000000000000000400000000000000000000000000',
//   blockHash: '0xaea0929dd4b1e2ebb09a95b859a049b642b7e39b38ac869675407e3f80bb25c0',
//   transactionHash: '0xabcd56811a4c527e6dd412625ef3d067836a3ca549da4a59984acbf57a1b7f75',
//   logs: [
//     {
//       transactionIndex: 4,
//       blockNumber: 30564110,
//       transactionHash: '0xabcd56811a4c527e6dd412625ef3d067836a3ca549da4a59984acbf57a1b7f75',
//       address: '0x7dFA5DdcAA9084E6e6EE4F80F24261fBABCbe32d',
//       topics: [Array],
//       data: '0x',
//       logIndex: 16,
//       blockHash: '0xaea0929dd4b1e2ebb09a95b859a049b642b7e39b38ac869675407e3f80bb25c0'
//     }
//   ],
//   blockNumber: 30564110,
//   confirmations: 3,
//   cumulativeGasUsed: BigNumber { _hex: '0x0eeef9', _isBigNumber: true },
//   effectiveGasPrice: BigNumber { _hex: '0x072fdb6699', _isBigNumber: true },
//   status: 1,
//   type: 0,
//   byzantium: true
// }
