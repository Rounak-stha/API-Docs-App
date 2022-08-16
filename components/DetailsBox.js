import { useState } from "react";
import Editor from "./Editor";
import Loader from "./Loader";

export default function DetailsBox({ value, setValue, view, requested }) {
    try {
        if (value) value = JSON.stringify(value, null, 4)
    } catch {}
    return view === 'Request' ?
            <Editor 
                value={value}
                setValue={setValue}
            /> : 
            view === 'Response' ? 
                requested ? <div className="p-4"><Loader /></div> : !value ? <p className="p-4">Make a Request</p> : 
                <Editor value={value} editable={false} /> : 
                <p className="p-4">{value}</p>
}
