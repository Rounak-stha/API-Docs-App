import { setAllCookies } from '@/lib/cookies'
import prisma from '@/lib/prisma'

export default async function(req, res) {
    const { code } = req.body

    // check code authenticity
    const doc = await prisma.docConfig.findUnique({ where: { code }, select: { id: true }})
    console.log(doc)

    if (doc) {
        setAllCookies(req, res)
        res.json({ success: true, redirect: '/config?login=true'})
    }
    else res.json({ success: false })
}