"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Register() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [hobbies, setHobbies] = useState("")
    const [reciveOffers, setReciveOffers] = useState(false)

    const redirigir = (code) => {
        console.log("Code", code)
        if (code == 200) {
            router.push("/login-usuarios")
        }
        else{
            alert("El correo electrónico ya está registrado, use otro correo electrónico.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
            name: name,
            age: age,
            city: city,
            hobbies: hobbies,
            reciveOffers: reciveOffers
        }

        fetch("/api/user-register", {
            method: "POST",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => redirigir(data.status))
    }

    return (
        <section>

            {/*Formulario de registro*/}
            <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 from-gray-900 to-gray-600 bg-gradient-to-r">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                {/* Título */}
                <div>
                    <p className="text-white text-xl font-bold">Regístrate</p>
                </div>

                {/* Formulario */}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                    {/* Nombre */}
                    <div>
                        <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" required />
                    </div>

                    {/* Email */}
                    <div>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Correo Electrónico" required />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Contraseña" x-model="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    {/* Edad */}
                    <div>
                        <input onChange={(e) => setAge(e.target.value)} type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Edad" required />
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

                    {/* Hobbies */}
                    <div>
                        <input onChange={(e) => setHobbies(e.target.value)} type="text" name="hobbies" id="hobbies" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hobbies" required />
                    </div>

                    {/* Recibir ofertas */}
                    <div className="flex items-center">
                        <input onChange={(e) => setReciveOffers(e.target.value)} type="checkbox" name="reciveOffers" id="reciveOffers" className="rounded text-primary-600 focus:ring-primary-600" />
                        <label htmlFor="reciveOffers" className="ml-2 block text-sm text-white-900">
                            Recibir ofertas
                        </label>
                    </div>

                    {/* Link a login de usuarios */}
                    <div className="flex justify-between">
                        <Link href="/login-usuarios" className="align-start text-xs font-thin text-white hover:underline">Ya tengo una cuenta</Link>
                    </div>
                    
                    {/* Botón de registro */}
                    <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-full text-sm px-5 py-2.5 text-center">Registrar</button>
                </form>

                </div>
            </div>
        </section>
    )
}