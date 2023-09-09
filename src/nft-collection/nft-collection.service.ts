import { PrismaService } from '@/prisma/prisma.service';
import { PrismaTX } from '@/prisma/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NftCollectionService {
  constructor(private readonly prismaService: PrismaService) {}

  findByName(name: string, tx?: PrismaTX) {
    const client = tx || this.prismaService;

    return client.nftCollection.findFirst({
      where: {
        name,
      },
    });
  }
}
