import { Injectable } from '@nestjs/common';
import { CollectionManager } from 'myria-core-sdk';
import { MyriaModuleFactoryService } from './myria-module-factory.service';

@Injectable()
export class CollectionService {
  private _collectionManager: CollectionManager;

  constructor(
    private readonly myriaModuleFactoryService: MyriaModuleFactoryService,
  ) {
    this._collectionManager = myriaModuleFactoryService.getCollectionManager();
  }
}
