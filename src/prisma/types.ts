import { PrismaService } from './prisma.service';

export type PrismaTX = Parameters<
  Parameters<PrismaService['$transaction']>[0]
>[0];
