import { useState } from "react"
import { useRouter } from 'next/router'
import axios from "axios"
import Link from "next/link"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export default function() {
    const [code, setCode] = useState('')
    const router = useRouter()
    return (
        <div className="h-screen  flex flex-col justify-center items-center">
            <div className="flex">
                <input 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type='text' 
                    placeholder="CODE"
                    className="px-4 pt-[6px] pb-2 mr-2 rounded-md bg-callout" 
                />
                <button 
                    onClick={() => { 
                        axios.post(
                            process.env.NEXT_PUBLIC_APP_URL + '/api/auth', 
                            { code }
                        ).then(({ data }) => {
                            if (data.success && data.redirect) {
                                router.push(data.redirect)
                            }
                        })
                    }}
                    className="px-4 pt-[6px] pb-2 font-semibold bg-blue-600 active:scale-90 rounded-md"
                >Login
                </button>
            </div>
            <Link 
                href='/config?guest=true'
            >
                <span 
                    className="mt-1 hover:underline cursor-pointer text-blue-500"
                >
                    Continue Without code ?
                </span>
            </Link>
        </div>
    )
}