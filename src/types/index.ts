import { PrismaService } from '@/prisma/prisma.service';

export type PrismaTX = Parameters<
  Parameters<PrismaService['$transaction']>[0]
>[0];
