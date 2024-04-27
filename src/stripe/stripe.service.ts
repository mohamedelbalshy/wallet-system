import {
  BadRequestException,
  Injectable,
  RawBodyRequest,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class StripeService {
  constructor(
    private readonly configService: ConfigService,
    private readonly walletService: WalletsService,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.getOrThrow('STRIPE_SECRET_KEY'),
  );
  async webhook(request: RawBodyRequest<Request>) {
    // Check if webhook signing is configured.
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const signature = request.headers['stripe-signature'];

    try {
      event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        this.configService.getOrThrow('STRIPE_WEBHOOK_SECRET'),
      );
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        `⚠️  Webhook signature verification failed.`,
      );
    }
    // Extract the object from the event.
    const data = event.data;
    const eventType = event.type;

    if (eventType === 'checkout.session.completed') {
      console.log(`🔔  Payment received!`);
    }
    if (eventType === 'payment_intent.succeeded') {
      console.log(data.object.metadata);
      console.log(data.object);
      await this.handlePaymentSuccess(data.object);
    }
    return;
  }

  async createIntent(
    params: Stripe.PaymentIntentCreateParams,
    options?: Stripe.RequestOptions,
  ) {
    return this.stripe.paymentIntents.create(params, options);
  }

  async createCustomer(email: string, name: string) {
    try {
      const customer = await this.stripe.customers.create({
        email: email,
        name: name,
      });
      console.log('Customer created:', customer);
      return customer.id; // Return the customer ID for further use if needed
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async createSource(customerId, cardToken) {
    try {
      const CustomerSource = await this.stripe.customers.createSource(
        customerId,
        {
          source: cardToken,
        },
      );
      console.log('Card saved:', CustomerSource);
      return CustomerSource;
    } catch (error) {
      console.error('Error saving card:', error);
    }
  }

  async createExternalAccount(
    accountId: string,
    bankAccountParams: {
      object: 'card';
      currency?: string;
      token: string;
    },
  ) {
    try {
      const bankAccount = await this.stripe.accounts.createExternalAccount(
        accountId,
        { external_account: bankAccountParams },
      );
      console.log('External bank account created:', bankAccount);
      return bankAccount.id;
    } catch (error) {
      console.error('Error creating external bank account:', error);
      throw error;
    }
  }

  async initiateTransfer(amount: number, destinationBankAccount: string) {
    try {
      const transfer = await this.stripe.transfers.create({
        amount: amount * 100, // Amount in cents
        currency: 'USD',
        destination: destinationBankAccount, // External bank account ID
      });
      console.log('Transfer initiated:', transfer);
      return transfer;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    }
  }

  async handlePaymentSuccess(data: any) {
    const userId = data.metadata.userId;
    const amount = data.amount / 100;
    await this.walletService.increment(userId, amount);
  }
}
