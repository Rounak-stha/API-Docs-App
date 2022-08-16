import { useEffect, useState } from "react";

export default function useTest() {
    const [online, setOnline] = useState(false)

    useEffect(() => {
        setTimeout(() => setOnline(true), 2000)
    })

    return online
}