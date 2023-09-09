import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionManager, TransactionPagingDetails } from 'myria-core-sdk';
import { MyriaDeveloperAccountService } from './myria-developer-account.service';
import { MyriaModuleFactoryService } from './myria-module-factory.service';

@Injectable()
export class TransactionService {
  private _transactionManager: TransactionManager;

  constructor(
    private readonly myriaModuleFactoryService: MyriaModuleFactoryService,
    private readonly myriaDeveloperAccountService: MyriaDeveloperAccountService,
    private readonly configService: ConfigService,
  ) {
    this._transactionManager =
      myriaModuleFactoryService.getTransactionManager();
  }

  async transfer(tokenId: string, contractAddress: string, address: string) {
    const myriaUserInfo =
      await this.myriaDeveloperAccountService.getUserInfoByWalletAddress(
        address,
      );

    const transferResult = await this.transferERC721Token(
      tokenId,
      contractAddress,
      myriaUserInfo.starkKey,
    );

    return transferResult;
  }

  async transferERC721Token(
    tokenId: string,
    contractAddress: string,
    starkKey: string,
  ) {
    const payload = {
      senderPublicKey: this.configService.get('STARK_KEY'),
      senderWalletAddress: this.configService.get('FEE_RECEIPT_ADDRESS'),
      myriaPrivateKey: this.configService.get('MYRIA_PRIVATE_KEY'),
      receiverPublicKey: starkKey,
      tokenAddress: contractAddress,
      tokenId: tokenId,
      quantizedAmount: '1',
    };

    return this._transactionManager.transferERC721Token(payload);
  }

  getTransactionsByGroupRequestIDAndPartnerRefID(
    groupReqID: string,
    partnerRefID: string,
    transactionPaging?: TransactionPagingDetails,
  ) {
    return this._transactionManager.getTransactionsByGroupRequestIDAndPartnerRefID(
      groupReqID,
      partnerRefID,
      transactionPaging,
    );
  }

  getTransactionsByPartnerRefID(partnerRefID: string) {
    return this._transactionManager.getTransactionsByPartnerRefID(partnerRefID);
  }

  getTransactionDetails(transactionId: number) {
    return this._transactionManager.getTransactionDetails(transactionId);
  }
}
