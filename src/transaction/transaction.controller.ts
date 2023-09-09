import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/latest-5-open-mystery-box-transactions')
  latest5OpenMysteryBoxTransactions() {
    return this.transactionService.latest5OpenMysteryBoxTransactions();
  }
}
