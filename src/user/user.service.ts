import { PrismaService } from '@/prisma/prisma.service';
import { PrismaTX } from '@/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrCreateByWalletAddress(walletAddress: string, tx?: PrismaTX) {
    const prismaClient = tx || this.prismaService;

    const user = await prismaClient.user.upsert({
      where: {
        walletAddress,
      },
      update: {},
      create: {
        walletAddress,
      },
    });

    return user;
  }
}
