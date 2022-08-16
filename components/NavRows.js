import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { DocsContext } from "../context/DocsContext"
import ColoredButton from "./ColoredButton"
import axios from "axios"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL


export default function NavRows() {
    const { docConfig } = useContext(DocsContext)

    const router = useRouter()

    const [allRoutes, setAllRoutes] = useState(Object.keys(docConfig))
    const [currRoute, setCurrRoute] = useState(router.asPath.split('/')[2])

    useEffect(() => {
        const localConfigData = localStorage.getItem('configData')
        if (localConfigData && allRoutes.length === 0) {
            const config = JSON.parse(localConfigData)
            const navItems = Object.keys(config)
            setAllRoutes(navItems)
        }
    }, [docConfig])

    return (
            <div className="h-[96vh] flex flex-col">
                <div
                    className="pt-2 md:pt-6 text-3xl text-center"
                >
                    <Link href='/config'><span onClick={() => setCurrRoute('config')} className='cursor-pointer hover:text-blue-800'>API DOCS</span></Link>
                </div>
                <div className="m-4 flex-1 flex flex-col">
                    <div>
                        {allRoutes.map((route, i) => (
                            <Link key={i} href={'/docs/' + route} >
                                <div className={`mt-2 cursor-pointer ${route === currRoute ? 'text-highlight font-semibold': ''}`}
                                    onClick={() => {
                                        setCurrRoute(route)
                                    }}
                                    >
                                        {route}
                                    </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex-1 flex justify-center items-end">
                        <ColoredButton 
                            text='🔐 Sign Out' 
                            handleClick={() => {
                                console.log('User is Logging out')
                                axios.get('/api/logout')
                                    .then(res => {
                                        if (res.data.loggedOut) {
                                            localStorage.removeItem('api')
                                            localStorage.removeItem('configData')
                                            window.location.href= '/'
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                        alert('An Error Occoured')
                                    })
                                }
                            }
                    />
                    </div>
                </div>
            </div>
    )
}