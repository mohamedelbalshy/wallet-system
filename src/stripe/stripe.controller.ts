import { Controller, Post, Request } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request as Req } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('webhook')
  webhook(@Request() request: Req) {
    return this.stripeService.webhook(request);
  }
}
