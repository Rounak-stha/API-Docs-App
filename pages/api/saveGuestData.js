import prisma from "@/lib/prisma"
import { generateCode } from "@/lib/utils"

export default async function(req, res) {
    try {
        const { data, apiUrl } = req.body
        const code = generateCode(req)
        await prisma.docConfig.create({
            data: {
                code, data, apiUrl
            }
        })
        return res.json({ code })
    } catch(err) {
        console.log(err)
        return res.status(500).end()
    }

} 