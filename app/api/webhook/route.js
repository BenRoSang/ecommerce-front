import Stripe from 'stripe';
import { headers } from 'next/headers';
import { Buffer } from 'micro'
import { NextResponse } from 'next/server';
import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/orderModel';
import { sendMail } from '@/service/MailService';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

    const body = await req.text();
    const sig = headers().get('Stripe-Signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.log(`❌ Error message: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type) {
        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    const data = event.data.object;
                    if(data.metadata.orderId && data.payment_status === 'paid') {
                        await mongooseConnect();
                        await Order.findByIdAndUpdate(data.metadata.orderId, {
                            paid: true
                        });
                        const order = await Order.findById(data.metadata.orderId);
                        console.log(order)
                        await sendMail(
                            "Test",
                            order.email,
                            "This is your buy information, Thanks you for using our service"
                        );
                    }
                break;
                default:
                    throw new Error('Unhandled relevant event!');
            }
        } catch (error) {
            console.log(error);
            return new Response('Webhook handler failed. View logs.', {
                status: 400
            });
        }
    }
    return new Response(JSON.stringify({ received: true }));
}

// acct_1NbRZZIU1xUMCCha account id