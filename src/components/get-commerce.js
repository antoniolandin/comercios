"use client"

import { useState } from "react"

export default function GetCommerce(email) {

    {/* UseState para guardar el comercio */}
    const [commerces, setCommerces] = useState([])

    fetch("/api/get-commerces", {
        method: "GET",
        headers: {
        //Authorization: `Bearer ${tokenJWT}`
        'Content-Type': 'application/json',
        }
    })
       .then((res) => res.json())
       .then((data) => setCommerces(data))


    {/* Ver si el comercio existe */}
    const commerceFiltered = commerces.filter((item) => item.email == email.email)

    {/* Mostrar el comercio si existe */}
    if(commerceFiltered.length > 0){

        const commerce = commerceFiltered[0]

        return (
            <section>
                <h1 className="text-black text-4xl mb-4">{commerce.title}</h1>
                <h1 className="text-black">Ciudad: {commerce.city}</h1>
                <h1 className="text-black">Resumen: {commerce.summary}</h1>
                <h1 className="text-black">Actividad: {commerce.activity}</h1>
            </section>
        )
    }
    else{
        return (
            <section>
                <h1 className="text-black text-4xl mb-4">Comercio no encontrado</h1>
            </section>
        )
    }

}