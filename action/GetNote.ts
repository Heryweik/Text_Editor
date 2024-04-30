'use server'

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function getDataHandler({ noteId }: { noteId: string}) {

    noStore();
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    const data = await prisma.note.findUnique({
      where: {
        id: noteId,
        userId: user?.id as string,
      },
      select: {
          title: true,
          description: true,
          content: true,
          id: true,
      }
    });
  
    return data;
  }