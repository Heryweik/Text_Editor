"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Tiptap = ({ onChange, content }: any) => {

  const pathname = usePathname();
  
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  
  let w = localStorage.getItem("content");

  /* console.log(pathname); */

  // Si la ruta es /dashboard/new, el contenido del editor de texto es vacio
  if (pathname === '/dashboard/new') {
    w = '';
  }

  const editor = useEditor({
    // Aqui van las extensiones que se quieran usar
    // Underline es una extension que no viene por defecto
    extensions: [StarterKit, Underline,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
        },
        levels: [2],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-input bg-background text-sm items-start w-full gap-3 font-medium pt-4 rounded-bl-md rounded-br-md outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:rounded-md break-all max-h-[500px] overflow-y-auto",
          // break-all es para que los saltos de linea se hagan en cualquier parte de la palabra
      },
    },
    /* Aqui ira el defaultValue */
    content: w,

    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    editable: true,
    autofocus: 'end'
    /* content: '<p>Hello World! 🌎️</p>', */
  });

  useEffect(() => {
    editor?.commands.setContent(w);
  }, [w]);

  /* useEffect(() => {
    if (x) {
      editor?.commands.setContent(x);
    }
  }, [x]); */

  return (
    <div className="w-full">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor}/>
    </div>
  );
};

export default Tiptap;
