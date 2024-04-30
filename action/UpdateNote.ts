'use server'

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateDatahandler(formData: FormData, noteId: string, content: string) {

    const { getUser } = getKindeServerSession();
  const user = await getUser();

    if (!user) {
        throw new Error('Not authorized')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string

    await prisma.note.update({
        where: {
            id: noteId,
            userId: user?.id,
        },
        data: {
            title,
            description,
            content,
        }
    })

    // Esto es para que se actualice la página
    revalidatePath('/dashboard')

    return redirect('/dashboard')
}