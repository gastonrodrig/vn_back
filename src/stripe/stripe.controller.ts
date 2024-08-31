import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { StripeService } from './stripe.service';
import * as bodyParser from 'body-parser';


@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createStripeDto: CreateStripeDto) {
    const paymentIntent = await this.stripeService.createPaymentIntent(createStripeDto);
    return paymentIntent;
  }

  @Post('webhook')
  async webhook(@Req() request: Request, @Res() response: Response) {
    const sig = request.headers['stripe-signature'];
    const rawBody = request.body as unknown as Buffer;

    try {
      const event = this.stripeService.stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
      await this.stripeService.handleWebhook(event);
      // response.status(200).send('Received');
    } catch (err) {
      console.error('Webhook Error:', err.message);
      // response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
