import { parse } from "cookie"
import prisma from "./prisma"

const PRE_SALT = process.env.PRE_SALT
const POST_SALT = process.env.POST_SALT
const A_COOKIE_NAME = process.env.A_COOKIE_NAME

async function getConfigData(cookies) {
    try {
        const code = Buffer.from(cookies[A_COOKIE_NAME], 'base64').toString().slice(PRE_SALT.length, -POST_SALT.length)

        const foundConfig = await prisma.docConfig.findUnique({ where: { code }})

        if (foundConfig) return { configData: foundConfig.data, apiUrl: foundConfig.apiUrl }
        else return { error: { authRequired: true } }
    } catch(err) {
        console.log(err)
        return { error: { serverError: true }}
    }
}

async function getCode(req) {
    const cookies = parse(req.headers.cookie)
    return Buffer.from(cookies[A_COOKIE_NAME], 'base64').toString().slice(PRE_SALT.length, -POST_SALT.length)
}

export { getConfigData, getCode }