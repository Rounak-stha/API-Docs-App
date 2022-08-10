import { parse } from "cookie"
import { getConfigData } from "./config"
import { clearAllCookies, setSessionCookie } from "./cookies"

const A_COOKIE_NAME = process.env.A_COOKIE_NAME
const S_COOKIE_NAME = process.env.NEXT_PUBLIC_S_COOKIE_NAME

const AUTH_REDIRECT = {
    redirect: {
        destination: '/auth',
        permanent: false
    }
}

const ERROR_REDIRECT = {
    redirect: {
        destination: 'error/500',
        permanent: false
    }
}

async function checkCtxAndReturnProps(ctx) {
    if (ctx.query.guest === 'true') return { props: { guest: true }}
    
    if (!ctx.req.headers.cookie) return AUTH_REDIRECT

    const cookies = parse(ctx.req.headers.cookie)

    if (!cookies[A_COOKIE_NAME]) {
        clearAllCookies(ctx.res)
        return AUTH_REDIRECT
    }

    if (cookies[S_COOKIE_NAME]) {
        if (ctx.query.login === 'true') {}
        else return { props: { newSession: false } }
    }

    setSessionCookie(ctx.req, ctx.res)

    const { configData, apiUrl, error } = await getConfigData(cookies)
    
    if (error) {
        if (error.authRequired) {
            clearAllCookies(ctx.res)
            return AUTH_REDIRECT
        }

        clearAllCookies(ctx.res)
        return ERROR_REDIRECT
    }
    return { props: { newSession: true,  configData, apiUrl } }
}

export { checkCtxAndReturnProps  }