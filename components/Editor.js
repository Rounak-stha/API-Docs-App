import { useEffect, useRef, useState } from "react";

export default function Editor({ value, format, setFormat, setValue, placeholder, editable = true }) {
    const tAreaSizeRef = useRef(null)

    if (!value) value = ''

    else if (typeof value === 'object') {
        let formattedValue  = JSON.stringify(value, null, 4)
        setValue(formattedValue)
    }

    useEffect(() => {
        console.log('Use Effect in Editor')
        if (tAreaSizeRef.current) {
            tAreaSizeRef.current.setAttribute("style", "height:" + (tAreaSizeRef.current.scrollHeight) + "px;overflow-y:auto;");
        }
        if (format) {
            console.log('Formatting')
            if (typeof value === 'string') {
                try {
                    let formattedValue = JSON.stringify(JSON.parse(value), null, 4)
                    setValue(formattedValue)
                    setFormat(false)
                } catch(err) {}
            }
        }
    }, [value])

    return (
            <div className='text-sm h-full w-full whitespace-pre-line break-words'>
                <textarea 
                    className={`mono-code rounded-md bg-callout outline-none focus:outline-btn-bdr p-4 w-full overflow-hidden custon-scrollbar ${!editable ? 'resize-none' : ''}`} 
                    ref={tAreaSizeRef}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        if (editable) setValue(e.target.value)
                    }}
                    onKeyDown={(e) =>{
                        if (e.key == 'Tab') {
                            let editor = tAreaSizeRef.current
                            e.preventDefault();
                            let start = editor.selectionStart;
                            let end = editor.selectionEnd;
                        
                            // set textarea value to: text before caret + tab + text after caret
                            editor.value = editor.value.substring(0, start) +
                              "\t" + editor.value.substring(end);
                        
                            // put caret at right position again
                            editor.selectionStart = editor.selectionEnd = start + 1;
                        }
                    }}
                />
            </div>
    )
}