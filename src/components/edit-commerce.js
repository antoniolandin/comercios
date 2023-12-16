"use client"

import { useState } from "react"

export default function EditCommerce(email) {

    {/* UseState para guardar el comercio */}
    const [commerces, setCommerces] = useState([])

    {/* UseState de todas las variables del comercio */}
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [summary, setSummary] = useState("")
    const [activity, setActivity] = useState("")

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
                .then((data) => redirigir(data.code))
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
                            <div>
                                <input onChange={(e) => setCity(e.target.value)} type="text" name="ciudad" id="ciudad" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ciudad"/>
                            </div>

                            {/* Resumen del comercio */}
                            <div>
                                <textarea onChange={(e) => setSummary(e.target.value)} type="text" name="resumen" id="resumen" placeholder="Resumen" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>

                            {/* Actividad del comercio */}
                            <div>
                                <textarea onChange={(e) => setActivity(e.target.value)} type="text" name="actividad" id="actividad" placeholder="Actividad" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            
                            {/*Botón para crear el comercio*/}
                            <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-full text-sm px-5 py-2.5 text-center">Editar comercio</button>
                        </form>
                    </div>
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