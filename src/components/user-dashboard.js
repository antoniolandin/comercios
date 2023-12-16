"use client"

import { useState } from "react"

export default function Dashboard() {

    {/* UseState para guardar el comercio */}
    const [comercios, setComercios] = useState([])

    fetch("/api/get-commerces", {
        method: "GET",
        headers: {
        //Authorization: `Bearer ${tokenJWT}`
        'Content-Type': 'application/json',
        }
    })
       .then((res) => res.json())
       .then((data) => setComercios(data))


    {/* Mostrar los comercios si hay comercios */}
    if(comercios.length > 0){
        const comerciosList = comercios.map((item) => {
            return {
                title: item.title,
                city: item.city,
                summary: item.summary,
                activity: item.activity,
                email: item.email,
                password: item.password
            }
        })

        return (
            <section>
                <div className="text-center">
                    <h1 className="text-black text-4xl mb-4">Comercios</h1>
                </div>

                <div className="flex flex-col space-y-4">
                    {/*Mostrar los comercios*/}
                    {comerciosList.map((comercio) => {
                        return (
                            <div key={comercio.email} className="flex flex-col space-y-4 pt-10 pb-8 shadow-xl ring-2 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                                <div className="flex flex-col space-y-4">
                                    <p className="text-black font-bold">{comercio.title}</p>
                                    <p className="text-slate-700">{comercio.summary}</p>
                                    <p className="text-slate-700">Ciudad: {comercio.city}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
    else{ {/* Mostrar que no hay comercios si no hay comercios */}
        return (
            <section>
                <h1 className="text-black text-4xl mb-4">Comercios</h1>
                <h1 className="text-black">No hay comercios</h1>
            </section>
        )
    }



    
}