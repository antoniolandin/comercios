"use client"

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import ShowCommerce from '@/components/show-commerce'
import Valorar from '@/components/rate-commerce'

export default function Home() {

    {/* Obtener el usuario de la URL */}
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    { /* UseState para asegurarse de que el fetch de la API se hace una sola vez */}
    const [fetchDone, setFetchDone] = useState(false)

    {/* UseState del comercio */}
    const [comercio, setComercio] = useState([])

    {/* Obtener los comercios solo al cargar la página */}
    if (!fetchDone) {
        {/* Obtener los comercios */}
        fetch("/api/get-commerces", {
            method: "GET",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => setComercio(data.filter((item) => item.email == email)[0] ))
    
        setFetchDone(true)
    }

    return (
        <main>
            <div className="flex min-h-screen flex-col items-center justify-center p-24">

                {/* Mostrar el comercio */}
                <div>
                    <ShowCommerce comercio={comercio} />
                </div>

                {/* Formulario para valorar el comercio */}
                <div className='mt-5'>
                    <Valorar comercio={comercio} />
                </div>

            </div>
        </main>
    )
}