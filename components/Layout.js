import { useState, useEffect, useContext } from "react";
import { DocsContext } from "@/components/DocsContext"
import NavRows from "./NavRows";
import { useRouter } from 'next/router'
import Link from "next/link";


export default function Layout({ children }) {
    const router = useRouter()

    const path = router.pathname.split('/')[1]
    const unAuthed = path === 'auth' || path === 'error' || router.query.guest === 'true'

    return (
        <div className="grid grid-cols-12">
            { unAuthed ? null :
            <div className="col-span-2 h-screen">
                <div className="sticky top-0 left-0 h-full border-r-2 border-bdr-clr">
                    <NavRows />
                </div>              
            </div>
            }
            <div className={`${unAuthed ? 'col-start-1 col-span-12': 'col-start-3 col-span-10'} h-screen`}>
                <div className="h-full pt-10 px-10">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}