"use client"

import { useState } from "react"
import Link from 'next/link'
import ShowCommerce from "@/components/show-commerce"

export default function Dashboard(usuario) {

    {/* UseState para guardar los comercios */}
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


    const mostrarUsuario = () => {
        if(usuario.usuario != undefined){

            console.log("Usuario", usuario.usuario)

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

        const emailsComercios = comercios.map((item) => {
            return {
                email: item.email,
                visible: item.visible
            }
        })

        return (
            <section>
                
                {/*Mostrar el usuario*/}
                {mostrarUsuario()}

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