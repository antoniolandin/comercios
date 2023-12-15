"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Crear() {

    const router = useRouter()

    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [summary, setSummary] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const redirigir = (code) => {
        console.log("Code", code)
        if (code == 200) {
            alert("Comercio creado correctamente")
        }
        else{
            alert("Error al crear el comercio: el mail ya está en uso")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        {/*Validar que los campos no estén vacíos*/}
        if(title != "" && city != "" && summary != ""){

            {/*Crear el objeto con los datos del formulario*/}
            const comercio = {
                title: title,
                city: city,
                summary: summary,
                mail: mail,
                password: password
            }

            {/*Enviar los datos del formulario al servidor*/}
            fetch("/api/create-commerce", {
                method: "POST",
                headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(comercio)
            })
               .then((res) => res.json())
               .then((data) => redirigir(data.status))
    
            {/*Limpiar los campos del formulario*/}
            document.getElementById("crear-comercio").reset();

            {/*Limpiar los estados del formulario*/}
            setTitle("")
            setCity("")
            setSummary("")    
            setMail("")
            setPassword("")
        }
        
    }

    return (
        <section className="bg-[#4586ef]">
            <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p className="text-white">Crear un nuevo comercio</p>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} id="crear-comercio">

                        {/*Título del comercio*/}
                        <div>
                            <input onChange={(e) => setTitle(e.target.value)} type="text" name="titulo" id="titulo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Título" required />
                        </div>

                        {/*Ciudad del comercio*/}
                        <div>
                            <input onChange={(e) => setCity(e.target.value)} type="text" name="city" id="city" placeholder="Ciudad" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>

                        {/*Resumen del comercio*/}
                        <div>
                            <textarea onChange={(e) => setSummary(e.target.value)} name="resumen" id="resumen" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Resumen" required></textarea>
                        </div>

                        {/*Mail del dueño del comercio*/}
                        <div>
                            <input onChange={(e) => setMail(e.target.value)} type="email" name="email" id="email" placeholder="Mail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>

                        {/*Contraseña del dueño del comercio*/}
                        <div>
                            <input onChange={(e) => setPassword(e.target.value)}  type="password" name="password" id="password" placeholder="Contraseña" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>

                        {/*Botón para crear el comercio*/}
                        <button type="submit" className="w-full text-blue-600 bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center">Crear comercio</button>

                    </form>
                </div>
            </div>
        </section>
    )
}