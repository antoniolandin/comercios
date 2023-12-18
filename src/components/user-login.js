"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const redirigir = (data) => {
        console.log(data)
        if (data.status == 200) {
            router.push("/usuarios?email=" + email)
        }
        else{
            alert("El correo electrónico o la contraseña son incorrectos.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        }

        fetch("/api/user-login", {
            method: "POST",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
           .then((res) => res.json())
           .then((data) => redirigir(data))
    }


    return (
        <section>
            <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 from-gray-900 to-gray-600 bg-gradient-to-r">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">

                    {/* Título */}
                    <div>
                        <p className="text-white text-xl font-bold">Iniciar sesión</p>
                    </div>

                    {/* Formulario */}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                        {/* Email */}
                        <div>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Correo Electrónico" required="" />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Contraseña" x-model="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>

                        {/* Link a registro de usuarios */}
                        <div className="flex justify-between">
                            <Link href="/register-usuarios" className="align-start text-xs font-thin text-white hover:underline">Crear una cuenta</Link>
                        </div>

                        {/* Botón de login */}
                        <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-full text-sm px-5 py-2.5 text-center">Entrar</button>
                    </form>

                </div>
            </div>

        </section>
    )
}