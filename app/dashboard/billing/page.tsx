import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { CheckCircle2 } from "lucide-react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession, stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { StripePortal, StripeSubscriptionCreationButton } from "@/components/SubmitButtons";

const featuresItems = [
  {
    name: "Unlimited Notes",
    description: "Write as many notes as you want",
  },
  {
    name: "Unlimited Notes",
    description: "Write as many notes as you want",
  },
  {
    name: "Unlimited Notes",
    description: "Write as many notes as you want",
  },
  {
    name: "Unlimited Notes",
    description: "Write as many notes as you want",
  },
];

// Esta función getData es para obtener la información del usuario, en este caso se esta obteniendo el status de la subscripción y el stripeCustomerId
// Esta informacion se usa para renderizar una u otra cosa dependiendo del estado de la subscripción
async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  return data;
}

export default async function BillingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Se obtiene la información del usuario
  const data = await getData(user?.id as string);

  // server action
  // Esta función es para crear la subscripción, en este caso se esta obteniendo el customerId del usuario y el priceId de la subscripción
  async function createSubscription() {
    'use server'

    // Se obtiene el stripeCustomerId del usuario
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        stripeCustomerId: true,
      },
    })

    if (!dbUser?.stripeCustomerId) {
      throw new Error('Unable to get customer id')
    }

    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: 'http://localhost:3000',
      priceId: process.env.STRIPE_PRICE_ID!,
    })

    return redirect(subscriptionUrl)
  }

  // server action
  // Esta función es para crear el portal del cliente, en este caso se esta obteniendo el customerId del usuario
  async function createCustomerPortal() {
    'use server'

    const session = await stripe.billingPortal.sessions.create({
      customer: data?.user.stripeCustomerId as string,
      return_url: 'http://localhost:3000/dashboard',
    })

    return redirect(session.url)
  }

  // Si el status de la subscripción es active se renderiza el formulario de edición de la subscripción
  if (data?.status === 'active') {
    return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl font-bold">Subscription</h1>
          <p className="text-lg text-muted-foreground">Settings readgding your subscription</p>
        </div>
      </div>
      
    <Card className="w-full lg:w-2/3">
      <CardHeader>
        <CardTitle>Edit Subscription</CardTitle>
        <CardDescription>Click on the button below, this will give you the opportunity to change your payment details and view your statement at the same time.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createCustomerPortal}>
          <StripePortal />
        </form>
      </CardContent>
    </Card>
    </div>
    )
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10">
              Monthly
            </h3>
          </div>

          <div className="mt-4 flex  text-6xl font-extrabold">
            $30 <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Write as many notes as you want for $30 a Month
          </p>
        </CardContent>
        <div className="flex flex-1 flex-col justify-between px-6 pt-6 pb-6 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featuresItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.name}</p>
              </li>
            ))}
          </ul>

          <form action={createSubscription} className="w-full">
            <StripeSubscriptionCreationButton />
          </form>
        </div>
      </Card>
    </div>
  );
}
