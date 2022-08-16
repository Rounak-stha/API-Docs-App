import { getCode } from "@/lib/config"
import prisma from "@/lib/prisma"

export default async function(req, res) {
    try {
        const code = await getCode(req)
        await prisma.docConfig.update({
            where: { code },
            data: { apiUrl: req.body.apiUrl }
        })
        res.setHeader('Content-Type', 'text/plain') // if not specified, firefox searches for html element and when not found displays error in console
        return res.end()
    } catch(err) {
        console.log(err)
        return res.status(500).end()
    }
}