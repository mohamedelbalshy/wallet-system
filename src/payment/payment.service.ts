import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from 'src/prisma.service';
import { Card } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    try {
      const { amount, currency, userId } = createPaymentDto;
      // Create a payment intent with the provided amount
      const paymentIntent = await this.stripeService.createIntent({
        amount: amount * 100, // Amount in cents
        currency,
        metadata: {
          userId,
        },
      });

      // Return the payment intent client secret
      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      // Handle errors
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const { externalId, userId, brand, expMonth, expYear, last4 } =
      createCardDto;

    const stripeCustomer = await this.prisma.stripeCustomer.findUnique({
      where: { userId },
    });
    if (!stripeCustomer)
      throw new NotFoundException(`Stripe Customer not found!`);

    await this.stripeService.createSource(
      stripeCustomer.customerId,
      externalId,
    );

    this.stripeService.createExternalAccount(
      this.configService.getOrThrow('STRIPE_ACCOUNT_ID'),
      {
        object: 'card',
        token: externalId,
        currency: 'USD',
      },
    );

    const card = await this.prisma.card.create({
      data: {
        expMonth,
        expYear,
        last4,
        externalId,
        userId,
        brand,
      },
    });

    return card;
  }
}
