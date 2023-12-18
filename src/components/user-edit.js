"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ShowUser from '@/components/show-user'

export default function Edit({email}) {

    const router = useRouter()

    {/* UseState para guardar los datos del usuario */}
    const [usuario, setUsuario] = useState([])

    {/* UseStates de todas las variables del usuario */}
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [interest, setInterest] = useState("")
    const [reciveOffers, setReciveOffers] = useState(false)

    {/* UseState para asegurarse de que solo se hace un fetch de la API */}
    const [fetchDone, setFetchDone] = useState(false)

    {/* Obtener la información del usuario */}
    if (!fetchDone) {
         {/* Obtener los datos del usuario */}
         fetch("/api/get-user", {
            method: "POST",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(email)
        })
        .then((res) => res.json())
        .then((data) => setUsuario(data))

        {/* Asegurarse de que el fetch de la API se hace una sola vez */}
        setFetchDone(true)
    }

    const handleSubmit = (e) => {

        {/* Evitar que la página se recargue al enviar el formulario */}
        e.preventDefault();

        {/* Hacemos una copia de usuario de esta forma porque sino el UseState no detecta cambios y no recarga la página */}
        let user = Object.assign({}, usuario)

        if (password != "") {
            user.password = password
        }

        if (name != "") {
            user.name = name
        }

        if (age != "") {
            user.age = age
        }

        if (city != "") {
            user.city = city
        }

        if (interest != "") {
            user.interest = interest
        }

        user.reciveOffers = reciveOffers

        fetch("/api/edit-user", {
            method: "POST",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        setUsuario(user)
    }

    return (
        <section>   

            <div>

                {/* Mostrar el usuario */}
                <div className='mb-5'>
                    <ShowUser key={usuario} usuario={usuario} />
                </div>

                {/*Formulario de registro*/}
                <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 from-gray-900 to-gray-600 bg-gradient-to-r">

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        {/* Título */}
                        <div>
                            <p className="text-white text-lg font-bold">Editar {usuario.name}</p>
                        </div>

                        {/* Formulario */}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                            {/* Nombre */}
                            <div>
                                <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" />
                            </div>

                            {/* Contraseña */}
                            <div>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Contraseña" x-model="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            {/* Edad */}
                            <div>
                                <input onChange={(e) => setAge(e.target.value)} type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Edad" />
                            </div>

                            {/* Ciudad */}
                            <div className="flex flex-col space-y-4 mt-5">
                                        <select defaultValue={"DEFAULT"} onChange={(e) => setCity(e.target.value)} name="ciudad" id="ciudad" className="block w-full  py-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                            {/* Placeholder */}
                                            <option value="DEFAULT" disabled hidden>Ciudad</option>

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

                            {/* Interes */}
                            <div className="flex flex-col space-y-4 mt-5">
                                <select defaultValue={"DEFAULT"} onChange={(e) => setInterest(e.target.value)} name="categoria" id="categoria" className="block w-full py-4 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                    {/* Placeholder */}
                                    <option value="DEFAULT" disabled hidden>Interés</option>

                                    {/* Opciones */}
                                    <option value="Alimentación">Alimentación</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Muebles">Muebles</option>
                                </select>
                            </div>

                            {/* Recibir ofertas */}
                            <div className="flex items-center">
                                <input defaultChecked={usuario.reciveOffers} onChange={(e) => setReciveOffers(e.target.checked)} type="checkbox" name="reciveOffers" id="reciveOffers" className="rounded text-primary-600 focus:ring-primary-600" />
                                <label htmlFor="reciveOffers" className="ml-2 block text-sm text-white-900">
                                    Recibir ofertas
                                </label>
                            </div>
                            
                            {/* Botón de editar */}
                            <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-full text-sm px-5 py-2.5 text-center">Editar</button>
                        </form>
                    </div>
                </div>  

                <div className="mt-4 text-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded text-xl" onClick=
                                        {() => {
                                                if(confirm('¿Estás seguro de que quieres borrar tu cuenta?')){
                                                    fetch("/api/delete-user", {
                                                    method: "DELETE",
                                                        headers: {
                                                        //Authorization: `Bearer ${tokenJWT}`
                                                        'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify(usuario)
                                                    })
                                                .then((res) => res.json())
                                                .then((data) => console.log(data))

                                                router.push("login-usuarios")
                                                }
                                            }
                                        }>
                                            Darse de baja
                    </button>
                </div>

            </div>
            
        </section>
    )
}