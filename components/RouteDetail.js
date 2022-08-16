import React, { useContext, useState } from "react";
import ColoredButton from "./ColoredButton";
import Loader from "./Loader";
import DetailsBox from "./DetailsBox";
import SelectBar from "./SelecBar";
import { callApi } from '@/lib/callApi'
import { DocsContext } from "../context/DocsContext";
import HighlightedTextarea from "./HighlightedTextarea";

async function coloredBtnHandleClick(setView, setContent, setRequested, action) {
    setView('Response')
    setRequested(1)
    const { api, method, path, request } = action
    callApi(api, method, path, request)
        .then(response => {
            setRequested(0)
            setContent({ text: typeof response === 'object' ? JSON.stringify(response, null, 4) : response})
        })
    setContent({ text: '...wait...'})
    
}

function selectBarHandleClick(view, setView, contentValue, setContent) {
    setView(view)
    setContent({ text: typeof contentValue === 'object' ? JSON.stringify(contentValue, null, 4) : contentValue})
}

export default function RouteDetail({ method, path, views }) {
    const [view, setView] = useState('Request')

    const [content, setContent] = useState({ text: typeof views[view] === 'object' ? JSON.stringify(views[view], null, 4) : views[view]})

    const [requested, setRequested] = useState(0)

    const { api } = useContext(DocsContext)

    views.Response = views.Response || 'Make a Request'
    
    return (
        <div className="mb-10">
            <div className="flex items-center mb-3">
                <ColoredButton 
                    text={method} 
                    handleClick={() => coloredBtnHandleClick(setView, setContent, setRequested, { api, method, path, request: views.Request })} 
                />
                <p className="ml-4 font-bold text-xl text-sky-50">{path}</p>
            </div>
            <SelectBar 
                options={Object.keys(views)} 
                view={view} 
                onClick={(v) => selectBarHandleClick(v, setView, views[v], setContent)} 
            />
            
            
            <div className="mt-3">
                
                { 
                    <HighlightedTextarea key={requested + view} content={content} /> 
                    
                }
            </div>
        </div>
    )

}