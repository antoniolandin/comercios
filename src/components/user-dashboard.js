"use client"

import { useState } from "react"
import Link from 'next/link'
import ShowCommerce from "@/components/show-commerce"
import { useCallback } from "react"

export default function Dashboard(usuario) {

    {/* UseState para guardar los comercios */}
    const [comercios, setComercios] = useState([])

    {/* UseState para guardar los comercios filtrados */}
    const [comerciosFiltrados, setComerciosFiltrados] = useState([])

    {/* UseState para asegurarse de que el fetch de la API se hace una sola vez */}
    const [fetchDone, setFetchDone] = useState(false)

    {/* Función para guardar los comercios después del fetch de la API*/}
    const set = (data) => {
        setComercios(data)
        setComerciosFiltrados(data)
    }

    if(!fetchDone){
        {/* Obtener los comercios */}
        fetch("/api/get-commerces", {
            method: "GET",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => set(data))

        {/* Asegurarse de que el fetch de la API se hace una sola vez */}
        setFetchDone(true)
    }

    {/* Función para mostrar el usuario */}
    const mostrarUsuario = () => {
        if(usuario.usuario != undefined){
            return (
                <section>
                    <h1 className="text-black text-4xl mb-4">Logueado como:</h1>
                    <h1 className="text-black">{usuario.usuario}</h1>
                </section>
            )
        }
        else{
            return (
                <section>
                    <h1 className="text-black text-4xl mb-4">No está logueado</h1>                    
                    <h1 className="text-black">Regístrese para poder valorar comercios desde la página de <Link className="text-blue-500 hover:text-blue-800" href="login-usuarios">Acceso Usuarios</Link></h1>
                </section>
            )
        }
    }

    {/* Ver cuantos comercios visibles hay */}
    const comerciosVisibles = comercios.filter((item) => item.visible == true)

    {/* Mostrar los comercios si hay comercios */}
    if(comerciosVisibles.length > 0){

        {/* Buscador de comercios en función del nombre */}
        const barrabusqueda = (busqueda) => {

            {/* Si la búsqueda está vacía, mostrar todos los comercios */}
            if(busqueda == ""){
                setComerciosFiltrados(comercios)
            }
            else{
                {/* Filtrar los comercios en función de la búsqueda */}
                const comerciosFiltrados = comercios.filter((item) => item.name.toLowerCase().includes(busqueda.toLowerCase()))
                setComerciosFiltrados(comerciosFiltrados)
            }
        }

        const emailsComercios = comerciosFiltrados.map((item) => {
            return {
                email: item.email,
                visible: item.visible
            }
        })

        return (
            <section>
                
                {/*Mostrar el usuario*/}
                {mostrarUsuario()}

                {/*Mostrar el buscador de comercios*/}
                <div className="flex flex-col space-y-4 mt-5">
                    <input onChange={(e) => barrabusqueda(e.target.value)} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar comercio..." />
                </div>

                <div className="flex flex-col space-y-4">

                    {/*Mostrar los comercios*/}
                    {
                        emailsComercios.map((comercio) => {

                            {/* Mostrar el comercio si es visible */}
                            if (comercio.visible == true) {
                                return (
                                    <ShowCommerce key={comercio.email} email={comercio.email}/>
                                )
                            }
                        })
                    }
                </div>
            </section>
        )
    }
    else{ {/* Mostrar que no hay comercios si no hay comercios */}
        return (
            <section>

                {/*Mostrar el usuario*/}
                {mostrarUsuario()}

                {/* Mostrar que no hay comercios */}
                <div className="mt-5">
                    <h1 className="text-black text-4xl mb-4">Comercios</h1>
                    <h1 className="text-black">No hay comercios</h1>
                </div>
                
            </section>
        )
    }



    
}