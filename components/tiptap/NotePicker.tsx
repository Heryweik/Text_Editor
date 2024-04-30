'use client'

import { use, useEffect, useLayoutEffect, useState } from "react";
import Tiptap from "./Tiptap";

export default function NotePicker({info, onContentChange}: { info: string,  onContentChange: (content: string) => void}) {

    
    /* const x = localStorage.getItem("content"); */

    const [content, setContent] = useState<string>(info);

    const handleContentChange = (reason: any) => {
        setContent(reason);
        onContentChange(reason);
    }

    // Funciona al quitar y poner este useEffect
    useEffect(() => {
        setContent(info);
    }, [info])



    /* useEffect(() => {
        const x = localStorage.getItem("content");
        setContent(x || "");
    }, []) */


    

  return (
        <Tiptap 
            content={content}
            onChange={handleContentChange}
            /* info={content} 
            
            (newContent: string) => handleContentChange(newContent)*/
        />
  )
}
