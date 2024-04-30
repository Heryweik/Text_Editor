"use client";

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

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import NotePicker from "@/components/tiptap/NotePicker";
import { Suspense, use, useEffect, useState } from "react";
import { postDataHandler } from "@/action/CreateNote";
import { getDataHandler } from "@/action/GetNote";
import { updateDatahandler } from "@/action/UpdateNote";
import { Loader2 } from "lucide-react";

export default function DynamicNote({ params }: { params: { id: string } }) {
  // Obtencion de la data de la nota
  const [data, setData] = useState<{
    id: string;
    title: string;
    description: string;
    content: string;
  } | null>(null);
  const [content, setContent] = useState<string>("");

  // useEffect que se activa al cargar la pagina
  useEffect(() => {
    async function fetchData() {
      try {
        const noteData = await getDataHandler({ noteId: params.id });
        //localStorage.setItem("content", noteData?.content || "");
        /* console.log(noteData); */
        
        localStorage.setItem("content", noteData?.content || "");
        setData(noteData);
        setContent(noteData?.content || "");

      } catch (error) {
        console.error("Error fetching note data:", error);
      }
    }

    fetchData();
  }, [params.id]);

  async function handleSubmit(formData: FormData) {
    try {
      await updateDatahandler(formData, data?.id as string, content);
    } catch (error) {
      console.error(error);
    }
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  if (!data) {
    return <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>;
  }

  return (
    <Card>
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can now edit your notes
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
              defaultValue={data?.title}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your note as you want"
              defaultValue={data?.description}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Content</Label>
            <NotePicker
              info={data?.content || ""}
              onContentChange={handleContentChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"destructive"} asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButtons />
        </CardFooter>
      </form>
    </Card>
  );
}
