import { serialize } from "cookie"

const PRE_SALT = process.env.PRE_SALT
const POST_SALT = process.env.POST_SALT

const A_COOKIE_NAME = process.env.A_COOKIE_NAME
const S_COOKIE_NAME = process.env.NEXT_PUBLIC_S_COOKIE_NAME

const A_COOKIE_OPTIONS = { path: '/', maxAge: 7 * 86400, httpOnly: true, sameSite: 'Strict' }
const S_COOKIE_OPTIONS = { path: '/', sameSite: 'Strict' }

function setCookies(res, cookieData) {
    let cookies
    if (Array.isArray(cookieData)) cookies = cookieData.map(({name, value, options}) => serialize(name, value, options))
    else cookies = serialize(cookieData.name, cookieData.value, cookieData.options)
    res.setHeader('Set-Cookie', cookies)
}

function setAllCookies(req, res) {
    const { code } = req.body
    const A_cookieValue = Buffer.from(PRE_SALT + code + POST_SALT).toString('base64')
    const S_cookieValue = Buffer.from(req.headers['x-forwarded-for'] || req.socket.remoteAddress + Date.now()).toString('base64')
    setCookies(res, [
        { name: A_COOKIE_NAME, value: A_cookieValue, options: A_COOKIE_OPTIONS },
        { name: S_COOKIE_NAME, value: S_cookieValue, options: S_COOKIE_OPTIONS }
    ])
}

function setSessionCookie(req, res) {
    const S_cookieValue = Buffer.from(req.headers['x-forwarded-for'] || req.socket.remoteAddress + Date.now()).toString('base64')
    setCookies(res, { name: S_COOKIE_NAME, value: S_cookieValue, options: { path: '/' }})
}

function clearAllCookies(res) {
    setCookies(res, [
        { name: A_COOKIE_NAME, value: '', options: { ...A_COOKIE_OPTIONS, maxAge: -1} },
        { name: S_COOKIE_NAME, value: '', options: { ...S_COOKIE_OPTIONS, maxAge: -1 } }
    ])
}

export { setCookies, setAllCookies, setSessionCookie, clearAllCookies }