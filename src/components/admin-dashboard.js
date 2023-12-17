"use client"

import Crear from "@/components/create-commerce"
import MostrarComerciosAdmin from "@/components/mostrar-comercios-admin"

import { useState } from "react"

export default function AdminDashboard() {

    {/* UseState para guardar el comercio */}
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

    {/* Obtener los comercios */}
    if (!fetchDone) {
        fetch("/api/get-commerces", {
            method: "GET",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => set(data))
    
        setFetchDone(true)
    }


    return (
        <section>
            <div className="flex flex-row space-x-10">

                {/*Formulario para crear un comercio nuevo*/}
                <div className="flex-auto">
                    <Crear comercios={comercios} setComercios={setComercios} comerciosFiltrados={comerciosFiltrados} setComerciosFiltrados={setComerciosFiltrados}/>
                </div>

                {/*Dashboard de administrador*/}
                <div className="flex-auto">
                    <MostrarComerciosAdmin comercios={comercios} setComercios={setComercios} comerciosFiltrados={comerciosFiltrados} setComerciosFiltrados={setComerciosFiltrados}/>
                </div>

            </div>
        </section>
    )
  }