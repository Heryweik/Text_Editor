import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { TrashDelete } from "@/components/SubmitButtons";

// Esta funcion es para obtener todas las notas del usuario
async function getData(userId: string) {
  const data = await prisma.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function DashboardPage() {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Notas del usuario
  const data = await getData(user?.id as string);

  // Esta función es para enviar la información al servidor, Se elimina la nota
  async function deleteNote(formData: FormData) {
    'use server'

    if (!user) {
      throw new Error('Not authorized')
    }

    // Se obtiene el id de la nota de un input que no se ve en el formulario
    // Se obtiene asi ya que no se puede pasar directamente el id de la nota extraido de la data
    const noteId = formData.get('noteId') as string

    await prisma.note.delete({
      where: {
        id: noteId,
        userId: user?.id,
      }
    })

    // Esto es porque al borrar la nota siempre queda en cache por lo que se sigue viendo en la UI, con esto se actualiza la página
    revalidatePath('/dashboard')
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl font-bold">Yout Notes</h1>
          <p className="text-lg text-muted-foreground">Here you can see and create new notes</p>
        </div>

        <Button asChild>
          <Link href="/dashboard/new">
            Create a new Note
          </Link>
        </Button>
      </div>

      {data.length < 1 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">You dont have any notes created</h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">You currently dont have any notes. Please create some so that you can see them right here.</p>

          <Button asChild>
            <Link href="/dashboard/new">
              Create a new Note
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data.map((note) => (
            <Card key={note.id} className="flex items-center justify-between p-4">
              <div>
                <h2 className="font-semibold text-xl text-primary">{note.title}</h2>
                {/* Esta es una forma de mostrar la fecha de creación de la nota, son parametros de la función Intl.DateTimeFormat */}
                <p>{new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short'
                }).format(new Date(note.createdAt))}</p>
              </div>

              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${note.id}`}>
                  <Button variant={"outline"} size={"icon"}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>

                <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={note.id} />
                  <TrashDelete />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
