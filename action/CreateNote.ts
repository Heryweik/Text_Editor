'use server'

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function postDataHandler(formData: FormData, content: string) {
  noStore();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.note.create({
    data: {
      userId: user?.id,
      title,
      description,
      content,
    },
  });
  
  // Esto es para que se actualice la página
  revalidatePath('/dashboard')

  return redirect("/dashboard");
}
