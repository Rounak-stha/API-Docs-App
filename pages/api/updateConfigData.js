import { getCode } from "@/lib/config"
import prisma from "@/lib/prisma"

export default async function(req, res) {
    try {
        const code = await getCode(req)
        await prisma.docConfig.update({
            where: { code },
            data: { data: req.body.data }
        })
        return res.end()
    } catch(err) {
        console.log(err)
        return res.status(500).end()
    }
}