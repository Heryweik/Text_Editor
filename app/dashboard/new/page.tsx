'use client'

import SubmitButtons from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/db";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import NotePicker from "@/components/tiptap/NotePicker";
import { useEffect, useState } from "react";
import { postDataHandler } from "@/action/CreateNote";
import { toast } from "@/components/ui/use-toast";


export default function NewNotePage() {
  noStore();

  /* const content = localStorage.getItem("content");
  console.log(content); */

  /* const { getUser } = getKindeServerSession();
  const user = await getUser(); */

  // Esta función es para enviar la información al servidor
  /* async function postData(formData: FormData) {
    "use server";

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
        content: '',
      },
    });

    return redirect("/dashboard");
  } */

  const [content, setContent] = useState("");

  // Función de devolución de llamada para manejar el cambio de contenido en el editor de texto
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  
  /* muestra el contenido del editor de texto en la consola en tiempo real */
  /* console.log(content); */
  

  async function handleSubmit(formData: FormData) {
    try {
      await postDataHandler(formData, content);
      toast({
        variant: "default",
        title: "Note created",
        description: "Your note has been created successfully",
      });
    } catch (error) {
      console.error(error);
      // Si hay un error, puedes mostrar una notificación de error aquí
      /* toast({
        variant: "destructive",
        title: "Failed to create note",
        description: "An error occurred while creating the note",
      }); */
    }
  }

  return (
    <Card className="">
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>
            Right here you can now create your new notes
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for your note"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your note as you want"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Content</Label>
            <NotePicker
              info=""
              onContentChange={handleContentChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"destructive"} asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButtons handleSubmit={handleSubmit}/>
        </CardFooter>
      </form>
    </Card>
  );
}
