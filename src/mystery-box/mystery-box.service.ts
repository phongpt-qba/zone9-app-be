import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MysteryBoxService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOpenedBoxCount() {
    return this.prismaService.myriaMysteryBox.count({
      where: {
        NOT: {
          mintedNftId: null,
        },
      },
    });
  }
}
