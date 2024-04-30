'use server'

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, unstable_noStore as noStore  } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteNoteHandler(noteId: string) {

    noStore();

    const { getUser } = getKindeServerSession();
  const user = await getUser();

    if (!user) {
        throw new Error('Not authorized')
    }

    await prisma.note.delete({
      where: {
        id: noteId,
        userId: user?.id,
      },
    });

    // Esto es porque al borrar la nota siempre queda en cache por lo que se sigue viendo en la UI, con esto se actualiza la página
    revalidatePath('/');
}