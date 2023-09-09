import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
