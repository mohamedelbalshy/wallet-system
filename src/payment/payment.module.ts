import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { ConfigService } from '@nestjs/config';
import { WalletsService } from 'src/wallets/wallets.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PrismaService,
    StripeService,
    ConfigService,
    WalletsService,
  ],
})
export class PaymentModule {}
