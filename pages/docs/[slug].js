import { useContext, useEffect } from "react"
import { DocsContext } from "@/components/DocsContext"
import RouteDetail from "@/components/RouteDetail";
import { checkCtxAndReturnProps } from "@/lib/session";

export default function({ newSession, configData, apiUrl, slug}) {
    const { docConfig, api, setApi, setDocConfig } = useContext(DocsContext)
    
    useEffect(() => {
      if (newSession) {
        localStorage.setItem('configData', configData)
        localStorage.setItem('api', apiUrl)
        setApi(apiUrl)
        setDocConfig(JSON.parse(configData))
        return
      }
      if (!api) setApi(localStorage.getItem('api'))
      if (Object.keys(docConfig).length === 0) setDocConfig(JSON.parse(localStorage.getItem('configData')))
    }, [])

    return (
        <div className='flex flex-col justify-start lg:w-1/2 md:w-2/3'>
            {   docConfig[slug] ?
                docConfig[slug].map(({method, path, details}, i) => (
                    <RouteDetail key={path} method={method} path={path} views={details} />
                )) : <></>
            }
        </div>
    ) 
}

export async function getServerSideProps(ctx) {
    const { slug } = ctx.params
    const returnObj = await checkCtxAndReturnProps(ctx) 
    if (returnObj.props) returnObj.props = {...returnObj.props, slug}
    return returnObj
}