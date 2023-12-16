"use client"

import { useState } from "react"

export default function AdminDashboard() {

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
                <div className="flex flex-col space-y-4">
                    {/*Mostrar los comercios*/}
                    {comerciosList.map((comercio) => {
                        return (
                            <div key={comercio.email} className="mt-5 bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 flex flex-col space-y-4 pt-4 pb-6 shadow-xl ring-2 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-7">
                                <div className="flex flex-col space-y-4">
                                    <p className="text-black font-bold text-xl">{comercio.title}</p>
                                    <p className="text-slate-700">{comercio.summary}</p>
                                    <p className="text-slate-700">Ciudad: {comercio.city}</p>

                                    {/*Mostrar el botón de borrar comercio*/}
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick=
                                    {() => {
                                            if(confirm('¿Estás seguro de que quieres borrar el comercio?')){
                                                fetch("/api/delete-commerce", {
                                                method: "DELETE",
                                                    headers: {
                                                    //Authorization: `Bearer ${tokenJWT}`
                                                    'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(comercio)
                                                })
                                            .then((res) => res.json())
                                            .then((data) => console.log(data))
                                            }
                                        }
                                    }>
                                        Borrar comercio
                                    </button>
                                    

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