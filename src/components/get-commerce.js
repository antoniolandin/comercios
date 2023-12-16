"use client"

import { useState } from "react"
import ShowCommerce from "@/components/show-commerce"

export default function GetCommerce(email) {

    {/* UseState para guardar el comercio */}
    const [commerces, setCommerces] = useState([])

    {/* Obtener los comercios */}
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

        {/* Función para mostrar si el comercio es visible o no */}
        const visibilidad = (visible) => {
            if(visible == true){
                return "sí"
            }
            else{
                return "no"
            }
        }

        const mostrarNegocio = () => {
            if(commerce.visible == false & commerce.city == "" & commerce.summary == "" & commerce.activity == ""){
                return (
                    <p className="text-black text-xl">El comercio aun no es visible, para que sea visible rellene la información que falta de su negocio</p>
                )
            }
            else{
                return (
                    <div>
                        <ShowCommerce email={commerce.email} />
                        <p>{visibilidad(commerce.visible)}</p>
                    </div>
                )
            }
        }

        return (
            <section>
                <h1 className="text-black text-4xl mb-4">{commerce.name}</h1>

                {/* Mostrar el comercio */}
                <div>
                    {mostrarNegocio()}
                </div>

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