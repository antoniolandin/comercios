"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function EditCommerce(email) {

    {/* UseState para guardar los comercios filtrados */}
    const [commercesFiltered, setCommercesFiltered] = useState([])

    {/* UseState para asegurarse de que solo se hace un fetch de la API */}
    const [fetchDone, setFetchDone] = useState(false)

    {/* UseState de todas las variables del comercio */}
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [summary, setSummary] = useState("")
    const [activity, setActivity] = useState("")

    {/* Router para redirigir al usuario */}
    const router = useRouter()

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
           .then((data) => setCommercesFiltered(data.filter((item) => item.email == email.email)))

        {/* Asegurarse de que el fetch de la API se hace una sola vez */}
        setFetchDone(true)
    }

    {/* Mostrar el comercio si existe */}
    if(commercesFiltered.length > 0){

        const commerce = commercesFiltered[0]

        {/* Función para editar el comercio */}
        const handleSubmit = (e) => {

            {/* Evitar que la página se recargue al enviar el formulario */}
            e.preventDefault();

            {/* Actualizar el objeto con los datos del formulario */}
            
            if (name != "") {
                commerce.name = name
            }

            if (title != "") {
                commerce.title = title
            }

            if (city != "") {
                commerce.city = city
            }

            if (summary != "") {
                commerce.summary = summary
            }

            if (activity != "") {
                commerce.activity = activity
            }   

            {/* Si todos los campos están llenos, el comercio es visible */}
            if (name != "" && title != "" && city != "" && summary != "" && activity != "") {
                commerce.visible = true
            }

            {/* Enviar el objeto al backend */}
            fetch("/api/edit-commerce", {
                method: "POST",
                headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(commerce)
            })
                .then((res) => res.json())
        }

        return (
            <section>
                <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 from-gray-900 to-gray-600 bg-gradient-to-r">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        {/* Título */}
                        <div>
                            <p className="text-white text-xl font-bold">Editar {commerce.name}</p>
                        </div>

                        {/* Formulario */}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} id="crear-comercio">

                            {/* Nombre del comercio */}
                            <div>
                                <input onChange={(e) => setName(e.target.value)} type="text" name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre"/>
                            </div>

                            {/* Título del comercio */}
                            <div>
                                <input onChange={(e) => setTitle(e.target.value)} type="text" name="titulo" id="titulo" placeholder="Título" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>

                            {/* Ciudad del comercio */}
                            <div className="flex flex-col space-y-4 mt-5">
                                <select onChange={(e) => setCity(e.target.value)} name="ciudad" id="ciudad" className="block w-full  py-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                    {/* Placeholder */}
                                    <option value="" disabled selected hidden>Ciudad</option>

                                    {/* Opciones */}
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

                            {/* Filtro de comercios por categoría */}
                            <div className="flex flex-col space-y-4 mt-5">
                                <select onChange={(e) => setActivity(e.target.value)} name="categoria" id="categoria" className="block w-full py-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                    {/* Placeholder */}
                                    <option value="" disabled selected hidden>Categoría</option>

                                    {/* Opciones */}
                                    <option value="Alimentación">Alimentación</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Muebles">Muebles</option>
                                </select>
                            </div>

                            {/* Resumen del comercio */}
                            <div>
                                <textarea onChange={(e) => setSummary(e.target.value)} type="text" name="resumen" id="resumen" placeholder="Resumen" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            
                            {/*Botón para crear el comercio*/}
                            <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-full text-sm px-5 py-2.5 text-center">Editar comercio</button>
                        </form>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick=
                                        {() => {
                                                if(confirm('¿Estás seguro de que quieres borrar el comercio?')){
                                                    fetch("/api/delete-commerce", {
                                                    method: "DELETE",
                                                        headers: {
                                                        //Authorization: `Bearer ${tokenJWT}`
                                                        'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify(commerce)
                                                    })
                                                .then((res) => res.json())
                                                .then((data) => console.log(data))

                                                router.push("login-comercios")

                                                }
                                            }
                                        }>
                                            Borrar comercio
                    </button>
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