import React, { useContext, useState } from "react";
import ColoredButton from "./ColoredButton";
import DetailsBox from "./DetailsBox";
import SelectBar from "./SelecBar";
import { callApi } from '@/lib/callApi'
import { DocsContext } from "./DocsContext";

async function coloredBtnHandleClick(setView, setValue, setRequested, action) {
    setView('Response')
    setRequested(1)
    const { api, method, path, request } = action
    const response = await callApi(api, method, path, request)
    setRequested(0)
    setValue(response)
}

function selectBarHandleClick(view, setView, value, setValue) {
    setView(view)
    setValue(value)
}

export default function RouteDetail({ method, path, views }) {
    const [view, setView] = useState('Request')
    const [value, setValue] = useState(views[view])
    const [requested, setRequested] = useState(0)

    const { api } = useContext(DocsContext)

    views.Response = views.Response || ''
    
    return (
        <div className="mb-10">
            <div className="flex items-center mb-3">
                <ColoredButton 
                    text={method} 
                    handleClick={() => coloredBtnHandleClick(setView, setValue, setRequested, { api, method, path, request: views.Request })} 
                />
                <p className="ml-4 font-bold text-xl text-sky-50">{path}</p>
            </div>
            <SelectBar 
                options={Object.keys(views)} 
                view={view} 
                onClick={(v) => selectBarHandleClick(v, setView, views[v], setValue)} 
            />
            <div className="mt-3 mono-code bg-callout rounded-md text-sm">
                <DetailsBox value={value} setValue={setValue} view={view} requested={requested} />
            </div>
        </div>
    )

}