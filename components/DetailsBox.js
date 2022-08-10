import { useState } from "react";
import Editor from "./Editor";
import Loader from "./Loader";
// import PrettyPrintJson from './PrettyPrintJson'

// use ResizeObserver

// https://stackoverflow.com/questions/58222004/how-to-get-parent-width-height-in-react-using-hooks
// https://stackoverflow.com/questions/7477/how-to-autosize-a-textarea-using-prototype

export default function DetailsBox({ value, setValue, view, requested }) {
    return view === 'Request' ?
            <Editor 
                value={value}
                setValue={setValue}
            /> : 
            view === 'Response' ? requested ? <div className="p-4"><Loader /></div> : !value ? <p className="p-4">Make a Request</p> : 
                <Editor value={value} editable={false} /> : 
                <p className="p-4">{value}</p>
}

/* 
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import PrettyPrintJson from './PrettyPrintJson'

// use ResizeObserver

// https://stackoverflow.com/questions/58222004/how-to-get-parent-width-height-in-react-using-hooks
// https://stackoverflow.com/questions/7477/how-to-autosize-a-textarea-using-prototype

export default function DetailsBox({ value, setValue, view, requested }) {
    const [height, setHeight] = useState(100)
    const [focused, setFocused] = useState(0)
    const tAreaSizeRef = useRef(null)

    useEffect(() => {
        if (tAreaSizeRef.current) {
            setHeight(tAreaSizeRef.current.scrollHeight)
        }
    }, [])

    return (
        <div id="tarea-sizer" className={`${focused ? 'border-highlight-light': 'border-dark'} border-2 p-4 text-sm rounded-md bg-callout h-full w-full whitespace-pre-line break-words`}>
            {
                view === 'Request' ?
                <textarea 
                    ref={tAreaSizeRef}
                    rows={Math.ceil(height / 20)}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) =>{
                        console.log(getComputedStyle(tAreaSizeRef.current))
                        const lines = e.target.value.split('\n')
                        lines.forEach(line => {
                            // console.log(String.raw`${line}`)
                            console.log(line.length)
                        }) 
                        setHeight(e.target.scrollHeight)
                    }}
                    onFocus={() => setFocused(1)}
                    onBlur={() => setFocused(0)}
                    value={typeof value === 'object' ? JSON.stringify(value, null, 4) : value}
                    className="bg-callout w-full overflow-hidden outline-none" 
                /> : 
                view === 'Response' ? requested ? <Loader /> : !value ? <p>Make a Request</p> : <PrettyPrintJson obj={value} /> : 
                value
            }
        </div>
        
    )
}

*/