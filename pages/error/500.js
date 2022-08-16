import { useEffect } from "react"

export default function Eror500() {
    useEffect(() => {
        if (!document.referrer) window.location.href = '/'
    })
    return (
        <div className="h-full flex justify-center items-center">
            <p className="text-xl">500 | An Unknown Error Occoured</p>
        </div>
    )
}