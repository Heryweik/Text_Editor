"use client";

import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, GridIcon, Loader2, Plus, Rows, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TrashDelete } from "@/components/SubmitButtons";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserHandler } from "@/action/GetUser";
import { useEffect, useState } from "react";
import { deleteNoteHandler } from "@/action/DeleteNote";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

// Esta funcion es para obtener todas las notas del usuario
// Aqui iba la funcion getData para obtener el usuario

export default function DashboardPage() {
  /* const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Notas del usuario
  const data = await getData(user?.id as string); */

  // Esta función es para enviar la información al servidor, Se elimina la nota

  // Se obtiene el usuario

  const [data, setData] = useState<{
    Subscription: {
      status: string;
    } | null;
    Notes: {
      id: string;
      title: string;
      description: string;
      content: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string | null;
    }[];
  } | null>(null);

  // useEffect que se activa al cargar la pagina y escucha el estado de data
  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserHandler();
        //localStorage.setItem("content", userData?.content || "");
        /* console.log(userData); */
        setData(userData);
      } catch (error) {
        console.error("Error fetching note data:", error);
      }
    }

    fetchData();
  }, []);

  // Eliminar nota
  async function deleteNote(noteId: string) {
    try {
      await deleteNoteHandler(noteId);
      // Quiero que se actualice la página
      // Funciona pero no es lo mejor
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid items-start gap-y-2 md:gap-y-4 ">
      <div className="flex items-center justify-between gap-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl font-bold">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>

        {data?.Subscription?.status === "active" ? (
          <>
            <Button asChild className="hidden md:block">
              <Link href="/dashboard/new">
                <span>Create a new Note</span>
              </Link>
            </Button>

            <Button
              size={"icon"}
              className=" md:hidden py-2 px-3 flex items-center justify-center w-fit"
              asChild
            >
              <Link href="/dashboard/new">
                <Plus className="w-5 h-5" />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild className="hidden md:block">
              <Link href="/dashboard/billing">
                <span>Create a new Note</span>
              </Link>
            </Button>

            <Button
              size={"icon"}
              className=" md:hidden py-2 px-3 flex items-center justify-center w-fit"
              asChild
            >
              <Link href="/dashboard/billing">
                <Plus className="w-5 h-5" />
              </Link>
            </Button>
          </>
        )}
      </div>

      {/* {data.length < 1 ? ( */}
      {/* Cambia la forma de obtener el tamanio, ya que ahora se obtiene un arreglo con las notas */}
      {data?.Notes.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-5 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You dont have any notes created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any notes. Please create some so that you
            can see them right here.
          </p>

          {data?.Subscription?.status === "active" ? (
            <Button asChild>
              <Link href="/dashboard/new">Create a new Note</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard/billing">Create a new Note</Link>
            </Button>
          )}
        </div>
      ) : (
        <Tabs defaultValue="table">
          <div className="flex justify-between items-center">
            <TabsList className="mb-3">
              <TabsTrigger value="table" className="flex gap-2 items-center">
                <Rows />
                Table
              </TabsTrigger>
              <TabsTrigger value="grid" className="flex gap-2 items-center">
                <GridIcon />
                Grid
              </TabsTrigger>
            </TabsList>

            <span>Notes: {data?.Notes.length}</span>
          </div>

          {!data && (
            <div className="flex items-center justify-center min-h-[50vh]">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          )}

          <TabsContent value="grid">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 0: 1, 750: 2, 1024: 3 }}
            >
              <Masonry gutter="20px">
                {data?.Notes.map((note) => (
                  <div
                    key={note.id}
                    className="group w-full"
                    /* style={{color: colors[index % colors.length]}} */
                  >
                    <Link
                      href={`/dashboard/new/${note.id}`}
                      className="w-[80%]"
                    >
                      <div
                        /* style={{background: colors[index % colors.length] }} */ className="px-3 py-2 truncate border border-secondary rounded-tl-md rounded-tr-md  hover:bg-secondary/50 bg-secondary"
                      >
                        <h2 className="font-semibold text-lg  truncate">
                          {note.title}
                        </h2>
                        <p className="text-xs flex justify-end text-muted-foreground">
                          {new Intl.DateTimeFormat("en-US", {
                            dateStyle: "full",
                            timeStyle: "short",
                          }).format(new Date(note.createdAt))}
                        </p>
                      </div>
                    </Link>
                    {/* Este div sirve para mostrar el contenido de la nota */}
                    <div className="relative">
                      <div
                        className="ProseMirror whitespace-pre-line border border-secondary px-6 py-4 rounded-bl-md rounded-br-md text-sm overflow-auto"
                        dangerouslySetInnerHTML={{ __html: note.content }}
                      />

                      <div className=" gap-x-2 absolute bottom-1 right-1 hidden group-hover:flex">
                        <Link href={`/dashboard/new/${note.id}`}>
                          <Button variant={"outline"} size={"icon"}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>

                        {/* <form action={() => deleteNote(note.id)}>
                          <TrashDelete />
                        </form> */}

                        <Dialog>
                          <DialogTrigger>
                            <Button variant={"destructive"} size={"icon"}>
                              <Trash className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete this note?</DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete this note from our servers.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex gap-2">
                              <div className="order-2 sm:order-1">
                                <form
                                  action={() => deleteNote(note.id)}
                                  className=""
                                >
                                  <TrashDelete />
                                </form>
                              </div>
                              <DialogClose className="w-full sm:w-auto order-1 sm:order-2">
                                <Button variant={"outline"} className="w-full">
                                  Cancel
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </TabsContent>
          <TabsContent value="table">
            <div className="flex flex-col gap-y-4">
              {data?.Notes.map((note) => (
                <Card
                  key={note.id}
                  className="flex items-center justify-between p-4 hover:bg-secondary/50 bg-secondary gap-x-2"
                >
                  <div>
                    <Link href={`/dashboard/new/${note.id}`}>
                      <h2 className="font-semibold text-lg ">
                        {note.title}
                      </h2>
                    </Link>
                    {/* Esta es una forma de mostrar la fecha de creación de la nota, son parametros de la función Intl.DateTimeFormat */}
                    <p className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "full",
                        timeStyle: "short",
                      }).format(new Date(note.createdAt))}
                    </p>
                  </div>

                  <div className="flex gap-x-4">
                    <Link href={`/dashboard/new/${note.id}`}>
                      <Button variant={"outline"} size={"icon"}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Dialog>
                      <DialogTrigger>
                        <Button variant={"destructive"} size={"icon"}>
                          <Trash className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete this note?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete this note from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex gap-2">
                          <div className="order-2 sm:order-1">
                            <form
                              action={() => deleteNote(note.id)}
                              className=""
                            >
                              <TrashDelete />
                            </form>
                          </div>
                          <DialogClose className="w-full sm:w-auto order-1 sm:order-2">
                            <Button variant={"outline"} className="w-full">
                              Cancel
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
