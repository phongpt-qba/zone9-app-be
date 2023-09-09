import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyriaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async getMysteryBoxesByWalletAddress(walletAddress: string) {
    const collection = await this.prismaService.nftCollection.findUnique({
      where: {
        contractAddress: this.configService.get('MYSTERY_BOX_ADDRESS'),
      },
    });
    const user = await this.userService.getOrCreateByWalletAddress(
      walletAddress,
    );
    const mysteryBoxes = await this.prismaService.myriaMysteryBox.findMany({
      where: {
        nftCollectionId: collection.id,
        receiverId: user.id,
      },
    });

    return mysteryBoxes;
  }
}
