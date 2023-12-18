"use client"

import { useState } from "react"

export default function Consultar() {

    const [usuarios, setUsuarios] = useState([])
    const [fetchDone, setFetchDone] = useState(false)

    {/* UseState para guardar los filtros seleccionados */}
    const [ciudad, setCiudad] = useState([])
    const [interes, setInteres] = useState([])

    const [emailsFiltrados, setEmailsFiltrados] = useState([])

    {/* Función para guardar los datos después del fetch de la API*/}
    const set = (data) => {
        setUsuarios(data)

        {/* Filtrar a los usuarios que no tengan activada la opción de recibir ofertas */}

        const usuariosFiltrados = data.filter((item) => item.reciveOffers == true)
        setEmailsFiltrados(usuariosFiltrados.map((item) => item.email))        
    }

    {/* Obtener los usuarios */}
    if (!fetchDone) {
        fetch("/api/get-users", {
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

    const filtrar = (interes, ciudad) => {

        let usuariosFiltrados = Object.assign([], usuarios)
    
        if (interes != "") {
            usuariosFiltrados = usuarios.filter((item) => item.interest == interes)
        }
    
        if (ciudad != "") {
            usuariosFiltrados = usuarios.filter((item) => item.city == ciudad)
        }
    
        {/* Filtrar a los usuarios que no tengan activada la opción de recibir ofertas */}
        usuariosFiltrados = usuariosFiltrados.filter((item) => item.reciveOffers == true)

        setEmailsFiltrados(usuariosFiltrados.map((item) => item.email))
    }

    const mostrarEmails = () => {

        if(emailsFiltrados.length == 0){
            return (
                <p className="text-black text-xl">No hay usuarios que cumplan los filtros seleccionados</p>
            )
        }
        else{
            return emailsFiltrados.map((item) => {
                return (
                    <p className="text-black text-xl">{item}</p>
                )
            })
        }
    }

    return (
        <section>


            <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 from-gray-900 to-gray-600 bg-gradient-to-r">

                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                    {/* Título */}
                    <div>
                        <p className="text-white text-xl font-bold">Consultar usuarios</p>
                    </div>

                    {/* Buscar por cuidad */}
                    <div className="flex flex-col space-y-4 mt-5">
                        <select onChange={(e) => {setCiudad(e.target.value); filtrar(interes, e.target.value)}} name="ciudad" id="ciudad" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Todas las ciudades</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Sevilla">Sevilla</option>
                            <option value="Alicante">Alicante</option>
                            <option value="Málaga">Málaga</option>
                            <option value="Jerez">Jerez</option>
                            <option value="Oviedo">Oviedo</option>
                        </select>
                    </div>

                    {/* Filtro de comercios por intereses */}
                    <div className="flex flex-col space-y-4 mt-5">
                        <select onChange={(e) => {setInteres(e.target.value); filtrar(e.target.value, ciudad)}} name="interes" id="interes" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Todas las categorías</option>
                            <option value="Alimentación">Alimentación</option>
                            <option value="Deportes">Deportes</option>
                            <option value="Muebles">Muebles</option>
                        </select>
                    </div>

                </div>
            </div>


            <div className="mt-5">
                {/* Título */}	
                <div className="mb-4">
                    <p className="text-black text-2xl font-bold">Usuarios:</p>
                </div>                

                {/* Mostrar los emails filtrados */}
                <div className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 flex flex-col space-y-4 pt-4 pb-6 shadow-xl ring-2 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-7">
                    {mostrarEmails()}
                </div>

            </div>

        </section>
    )

}