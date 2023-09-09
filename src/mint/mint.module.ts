import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintService } from './mint.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
