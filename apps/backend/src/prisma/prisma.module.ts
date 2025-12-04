import { Global, Module } from '@nestjs/common';
import { Prisma } from './prisma.js';

@Global()
@Module({
  providers: [Prisma],
  exports: [Prisma],
})
export class PrismaModule {}
