"use client"

import { useState } from "react"

export default function GetCommerce(email) {

    {/* UseState para guardar el comercio */}
    const [commerce, setCommerce] = useState([])

    fetch("/api/get-commerce", {
        method: "POST",
        headers: {
        //Authorization: `Bearer ${tokenJWT}`
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    })
       .then((res) => res.json())
       .then((data) => setCommerce(data))

    return (
        <section>
            <h1 className="text-black text-4xl mb-4">{commerce.title}</h1>
            <h1 className="text-black">Ciudad: {commerce.city}</h1>
            <h1 className="text-black">Resumen: {commerce.summary}</h1>
        </section>
    )
}