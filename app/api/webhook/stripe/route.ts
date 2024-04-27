import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();

    const signature = headers().get('Stripe-Signature') as string

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: unknown) {
        return new Response('webhook error', { status: 400 })
    }

    // Se obtiene el evento de stripe
    const session = event.data.object as Stripe.Checkout.Session

    // Si el evento es de tipo checkout.session.completed, se crea la subscripción para le usuario
    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        // Se obtiene el customerId del usuario
        const customerId = String(session.customer)

        // Se busca el usuario con el customerId
        const user = await prisma.user.findUnique({
            where: {
                stripeCustomerId: customerId
            },
        })

        if (!user) {
            return new Response('user not found...')
        }

        // Se crea la subscripción
        await prisma.subscription.create({
            data: {
                stripeSubscriptionId: subscription.id,
                userId: user.id,
                currentPeriodStart: subscription.current_period_start,
                currentPeriodEnd: subscription.current_period_end,
                status: subscription.status,
                planId: subscription.items.data[0].price.id,
                interval: String(subscription.items.data[0].plan.interval),
            }
        })
    }

    // Si el evento es de tipo invoice.payment_succeeded, se actualiza la subscripción del usuario
    if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await prisma.subscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                planId: subscription.items.data[0].price.id,
                currentPeriodStart: subscription.current_period_start,
                currentPeriodEnd: subscription.current_period_end,
                status: subscription.status
            }
        })
    }

    return new Response(null, { status: 200 })
}