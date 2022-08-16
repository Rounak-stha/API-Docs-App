import { clearAllCookies } from "@/lib/cookies"

export default function(_ , res) {
    try {
        console.log('Signing out')
        clearAllCookies(res)
        return res.json({ loggedOut: true })
    } catch(e) {
        console.log(err)
        return res.status(500).end()
    }
}