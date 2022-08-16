import { useEffect, useRef, useState } from "react";

export default function Input({ context, fitContent=false, border=true, outline=true, customOnChange, placeholder }) {
    const [value, setValue] = useState(context.text)

    const inputRef = useRef(null) 

    useEffect(() => { 
        setValue(context.text)
        if (!context.text.length) inputRef.current.style.width = placeholder.length + 'ch'
        else inputRef.current.style.width = context.text.length + 'ch'
        }, [context])

    return (
        <div className={`${border ? 'bg-callout' : 'bg-inherit'} inline-block px-4 pt-[6px] pb-2`}>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    context.text = e.target.value
                    if (fitContent) {
                        const valueLength = e.target.value.length
                        if (!valueLength) inputRef.current.style.width = placeholder.length + 'ch'
                        else inputRef.current.style.width = valueLength + 'ch'
                    }
                    if (customOnChange && typeof customOnChange === 'function') customOnChange()
                }}
                className={`${border && 'border-none'} ${outline ? '' : 'focus:outline-none'}  bg-inherit font-light text-sm rounded-md mono-code`}
                placeholder={placeholder}
            />
        </div>
    )
}
