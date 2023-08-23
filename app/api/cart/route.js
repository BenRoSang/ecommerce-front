import { Order } from "@/models/orderModel";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function OPTIONS(request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });

    return response;
}

export async function POST(request) {
    const {name, email, city, postal, address, country, cartProducts} = await request.json();

    const productIds = [...new Set(cartProducts)];
    const productInfos = await Product.find({_id: productIds});

    //Data for Stripe
    let line_items = [];
    for(const productId of productIds) {
        const productInfo = productInfos.find(product => product._id.toString() === productId);
        const quantity = cartProducts.filter(id => id === productId).length || 0;
        if(quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: productInfo.title
                    },
                    unit_amount: productInfo.price * 100
                }
            })
        }
    }

    // create order in mongodb
    const orderDoc = await Order.create({
        line_items,
        name,
        email,
        city,
        postal,
        address,
        country,
        paid: false
    })
    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            customer_email: email,
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart?canceled=true`,
            metadata: {orderId: orderDoc._id.toString()}
        });
        return NextResponse.json({session})
    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
    // return NextResponse.json({line_items})


}