import { Injectable } from '@nestjs/common';
import { ModuleFactory } from 'myria-core-sdk';
import { MyriaClientService } from './myria-client.service';

@Injectable()
export class MyriaModuleFactoryService extends ModuleFactory {
  constructor(private readonly myriaClientService: MyriaClientService) {
    super(myriaClientService);
  }
}
