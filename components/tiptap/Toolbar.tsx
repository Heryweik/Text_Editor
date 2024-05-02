import { type Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Expand,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Minimize,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {
  editor: Editor | null;
  content: string;
};

export default function Toolbar({ editor, content }: Props) {
  
  
  /* // Obtenemos de localStorage si el editor de texto esta expandido o no
  const local = localStorage.getItem("expand");

  //Estado para saber si el editor de texto esta expandido o no, al dar click sobre el boton va cambiar el estado
  const [expand, setExpand] = useState<boolean>(local === "true" ? true : false);

  const handleChange = () => {
    setExpand(!expand);
    if (expand === true) {
      localStorage.setItem("expand", "false");
    } else {
      localStorage.setItem("expand", "true");
    }
  } */

  if (!editor) {
    return null;
  }


  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-center gap-5 w-full flex-wrap border border-input bg-background">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        {/* Bold Button */}
        <button
          onClick={(e) => {
            // Prevent the default action of the button
            // Sirve para prevenir la acción por defecto del botón
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Bold className="w-5 h-5" />
        </button>

        {/* Italic Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Italic className="w-5 h-5" />
        </button>

        {/* Underline Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Underline className="w-5 h-5" />
        </button>

        {/* Strikethrough Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>

        {/* h1 heading Button */}
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Heading1 className="w-5 h-5" />
        </button> */}

        {/* h2 heading Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>

        {/* unordered bullet list Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <List className="w-5 h-5" />
        </button>

        {/* ordered number list Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        {/* blockquote Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Quote className="w-5 h-5" />
        </button>

        {/* Code Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-primary/50 p-1 rounded-lg"
              : "text-primary"
          }
        >
          <Code className="w-5 h-5" />
        </button>

        {/* Undo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-primary/50 p-2 rounded-lg"
              : "text-primary hover:bg-primary/50 hover:text-white hover:rounded-lg p-1"
          }
        >
          <Undo className="w-5 h-5" />
        </button>

        {/* Redo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-primary/50 p-2 rounded-lg"
              : "text-primary hover:bg-primary/50 hover:text-white hover:rounded-lg p-1"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>

      {/* <Button
      type="button"
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          handleChange();
        }}
      >
        {expand ? (
          <Minimize className="w-5 h-5" />
        ) : (
          <Expand className="w-5 h-5" />
        )}
      </Button> */}
    </div>
  );
}
