
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// No se usaaaaaaaaaaaa

export async function GET(
    req: Request,
    { params }: { params: { noteId: string } }
) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Busca la tarjeta por el id y la lista a la que pertenece, ademas de la informacion de la tarjeta esta incluye el titulo de la lista
        const notes = await prisma.note.findUnique({
            where: {
                id: params.noteId,
            userId: user?.id as string,
            },
            select: {
                title: true,
                description: true,
                content: true,
                id: true,
            }
        })

        return NextResponse.json(notes)

    } catch (error) {
        return new NextResponse("Internar Error", { status: 500})
    }
}