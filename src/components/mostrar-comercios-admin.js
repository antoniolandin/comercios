"use client"

import { useState, useEffect } from "react"

export default function MostrarComerciosAdmin({comercios, setComercios, comerciosFiltrados, setComerciosFiltrados}) {

    const visibilidad = (visible) => {
        if(visible == true){
            return "Visible"
        }
        else{
            return "No visible"
        }
    }

    {/* Mostrar los comercios si hay comercios */}
    if(comercios.length > 0){
        const comerciosList = comerciosFiltrados.map((item) => {
            return {
                name: item.name,
                CIF: item.CIF,
                address: item.address,
                phone: item.phone,
                email: item.email,
                password: item.password,
                visible: item.visible,
                city: item.city,
                summary: item.summary,
                activity: item.activity,
                scores: item.scores,
                comments: item.comments
            }
        })

        return (
            <section>

                <div className="flex flex-col space-y-4">

                    {/*Mostrar el buscador de comercios*/}
                    <div className="flex flex-col space-y-4 mt-5">
                        <input onChange={(e) => {setComerciosFiltrados(comercios.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())))}} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar comercio..." />
                    </div>

                    {/*Mostrar los comercios*/}
                    {comerciosList.map((comercio) => {
                        return (
                            <div key={comercio.email} className="mt-5 bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 flex flex-col space-y-4 pt-4 pb-6 shadow-xl ring-2 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-7">
                                <div className="flex flex-col space-y-4">
                                    <p className="text-black font-bold text-xl">Nombre: {comercio.name}</p>
                                    <p className="text-slate-700">CIF: {comercio.CIF}</p>
                                    <p className="text-slate-700">Ciudad: {comercio.address}</p>
                                    <p className="text-slate-700">Teléfono: {comercio.phone}</p>
                                    <p className="text-slate-700">Correo electrónico: {comercio.email}</p>
                                    <p className="text-slate-700">Contraseña: {comercio.password}</p>
                                    <p className="text-slate-700">visible: {visibilidad(comercio.visible)}</p>
                                    <p className="text-slate-700">Ciudad: {comercio.city}</p>
                                    <p className="text-slate-700">Resumen: {comercio.summary}</p>
                                    <p className="text-slate-700">Actividad: {comercio.activity}</p>
                                    <p className="text-slate-700">Puntuaciones: {comercio.scores}</p>

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

                                            {/* Borrar el comercio del array de comercios */}
                                            const comerciosFiltrados = comercios.filter((item) => item.email != comercio.email)
                                            setComercios(comerciosFiltrados)
                                            setComerciosFiltrados(comerciosFiltrados)
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