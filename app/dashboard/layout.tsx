import DashboardNav from "@/components/DashboardNav";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { unstable_noStore as noStore } from "next/cache";

// getData function to get user data from the session and save it to the database
async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {

  // noStore() prevents the function from being cached, as it needs to be executed on the server
  noStore();

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    }
  })

  // If the user is not found, create a new user
  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id,
        email,
        name,
      },
    });
  }

  // Creamos el stripeCustomerId con el archivo de stripe y lo guardamos en la base de datos
  // If the user does not have a stripeCustomerId, create a new customer in Stripe
  // Esto se puede verificar en la web de stripe en el apartado de customers/clientes
  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email,
    })

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        stripeCustomerId: data.id,
      }
    })
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Redirect to home if user is not authenticated
  if (!user) {
    return redirect("/");
  }

  // Get user data
  await getData({
    email: user.email as string,
    id: user.id,
    firstName: user.given_name,
    lastName: user.family_name,
    profileImage: user.picture,
  })

  return (
    <div className="flex flex-col space-y-6 min-h-svh">
      {/* con esta clase md:grid-cols-[200px_1fr] le decimos que en pantallas medianas se muestre el aside y el main en columnas, el aside con un ancho de 200px y el main con el resto del espacio disponible */}
      <div className="w-full max-w-7xl px-2 md:px-6 grid flex-1 gap-8  mx-auto  "> {/* md:grid-cols-[200px_1fr] */}
        <aside className="hidden w-[200px] flex-col md:flex  pt-5 md:pt-10 border-r pr-5 fixed h-full">
          <DashboardNav />
        </aside>
        <main className=" md:ml-[200px] md:pl-5  py-5 md:py-10 mt-[10vh]">{children}</main>
      </div>
    </div>
  );
}
