"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function getUserHandler() {
  // Sirve para que no se cachee la función, esto ya que se necesita que se ejecute en el servidor
  noStore();

  const { getUser } = getKindeServerSession();
    const user = await getUser();

  /* const data = await prisma.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  }); */

  // Se cambia la forma de obtener los datos, ahora se obtiene el estado de la subscripcion y sus notas
  const data = await prisma.user.findUnique({
    where: {
      id: user?.id as string,
    },
    select: {
      Notes: {
        orderBy: {
          createdAt: "desc",
        },
      },
      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });

  return data;
}
