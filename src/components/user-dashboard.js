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

    const set = (data) => {
        setComercios(data)
        setComerciosFiltrados(data)
    }

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

    {/* Mostrar los comercios si hay comercios */}
    if(comercios.length > 0){

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
                <div className="flex flex-col space-y-4">
                    <label htmlFor="search" className="text-black font-bold text-xl">Buscar comercio</label>
                    <input type="text" id="search" className="text-black font-bold text-xl" onChange={(e) => barrabusqueda(e.target.value)} />
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
                <h1 className="text-black text-4xl mb-4">Comercios</h1>
                <h1 className="text-black">No hay comercios</h1>
            </section>
        )
    }



    
}