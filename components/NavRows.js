import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { DocsContext } from "./DocsContext"


export default function NavRows() {
    const { docConfig } = useContext(DocsContext)

    const router = useRouter()

    const [allRoutes, setAllRoutes] = useState(Object.keys(docConfig))
    const [currRoute, setCurrRoute] = useState(router.asPath.split('/')[2])

    useEffect(() => {
        console.log('UseEffect in NavRows')
        const localConfigData = localStorage.getItem('configData')
        if (localConfigData && allRoutes.length === 0) {
            const config = JSON.parse(localConfigData)
            const navItems = Object.keys(config)
            setAllRoutes(navItems)
        }
    }, [docConfig])

    return (
            <>
                <Link href='/config'>
                    <p 
                        className="pt-6 text-3xl text-center cursor-pointer hover:text-blue-800"
                        onClick={() => setCurrRoute('config')}
                    >
                        API Docs
                    </p>
                </Link>
                <div className="m-4">
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
            </>
    )
}