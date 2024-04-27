import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { WalletsModule } from '../wallets/wallets.module';
import { WalletsService } from '../wallets/wallets.service';

@Module({
  imports: [WalletsModule],
  controllers: [StripeController],
  providers: [StripeService, ConfigService, PrismaService, WalletsService],
  exports: [StripeService],
})
export class StripeModule {}
