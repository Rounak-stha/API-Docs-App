import HighlightedTextarea from "@/components/HighlightedTextarea";
import { useEffect, useRef, useState } from "react";

export default function() { 

    const [content, setContent] = useState({
        text: JSON.stringify([
            {"method": "POST", path: '/abc/xy', description: "This is a dummy description"},
            {"method": "POST", path: '/abc/xy', description: "This is a dummy description"},
            {"method": "POST", path: '/abc/xy', description: "This is a dummy description"}
        ], null, 2)
    })
    return (
        <>
            <span>afuiuywefiuwyefiuyqwe afuiuywefiuwyefiuyqwe afuiuywefiuwyefiuyqwe
            afuiuywefiuwyefiuyqweafuiuywefiuwyefiuyqwe
            afuiuywefiuwyefiuyqwe
            afuiuywefiuwyefiuyqwe
            afuiuywefiuwyefiuyqwef</span> 
            <button onClick={() => console.log(content)}>Console Content</button>
            <HighlightedTextarea content={content} />
            <p>hahah</p>
        </>
    )
}