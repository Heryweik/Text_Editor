import DashboardNav from "@/components/DashboardNav";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col space-y-6 mt-10">
      {/* con esta clase md:grid-cols-[200px_1fr] le decimos que en pantallas medianas se muestre el aside y el main en columnas, el aside con un ancho de 200px y el main con el resto del espacio disponible */}
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
