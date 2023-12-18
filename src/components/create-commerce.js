"use client"

import { useState } from 'react'

export default function Crear({comercios, setComercios, comerciosFiltrados, setComerciosFiltrados}) {

    {/* UseStates de todos los campos del formulario */}
    const [name, setName] = useState("")
    const [CIF, setCIF] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    {/* Función para mostrar el mensaje de éxito o error */}
    const mostrarMensaje = (data) => {
        console.log(data)
        if (data.status == 200) {
            alert("Comercio creado correctamente")
        }
        else{
            alert("Error al crear el comercio")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const comerciosFiltered = comercios.filter((item) => item.email == email)

        if(comerciosFiltered.length > 0){
            alert("El mail ya está en uso")
            console.log("El mail ya está en uso")
        }
        else if(name != "" && CIF != "" && address != "" & phone != "" & email != "" && password != "" ){ {/* Validar que los campos no estén vacíos */}

            {/* Crear el objeto con los datos del formulario */}
            const comercio = {
                name: name,
                CIF: CIF,
                address: address,
                phone: phone,
                email: email,
                password: password,
                visible: false,

                /* Datos que se añadirán en el futuro */
                city: "",
                summary: "",
                activity: "",
                title: "",
                reviews: [],
            }

            {/* Enviar los datos del formulario al servidor */}
            fetch("/api/create-commerce", {
                method: "POST",
                headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(comercio)
            })
               .then((res) => res.json())
               .then((data) => mostrarMensaje(data))
    
            {/* Limpiar los campos del formulario */}
            document.getElementById("crear-comercio").reset();

            {/* Limpiar los estados del formulario */}
            setName("")
            setCIF("")
            setAddress("")   
            setPhone("") 
            setEmail("")
            setPassword("")

            {/* Añadir el comercio al array de comercios */}
            setComercios([...comercios, comercio])
            setComerciosFiltrados([...comerciosFiltrados, comercio])
        }
    }

    return (
        <section>
            <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 from-gray-900 to-gray-600 bg-gradient-to-r">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                    {/* Título */}
                    <div>
                        <p className="text-white text-xl font-bold">Crear comercio</p>
                    </div>

                    {/* Formulario */}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} id="crear-comercio">

                        {/* Nombre del comercio */}
                        <div>
                            <input onChange={(e) => setName(e.target.value)} type="text" name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" required />
                        </div>

                        {/* CIF del comercio */}
                        <div>
                            <input onChange={(e) => setCIF(e.target.value)} type="text" name="CIF" id="CIF" placeholder="CIF" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>

                        {/* Dirección del comercio */}
                        <div>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" name="direccion" id="direccion" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dirección" required />
                        </div>

                        {/* Teléfono del comercio */}
                        <div>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" name="telefono" id="telefono" placeholder="Teléfono" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>

                        {/* E-mail del dueño del comercio */}
                        <div>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Mail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>

                        {/* Contraseña del dueño del comercio */}
                        <div>
                            <input onChange={(e) => setPassword(e.target.value)}  type="password" name="password" id="password" placeholder="Contraseña" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>

                        {/*Botón para crear el comercio*/}
                        <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-full text-sm px-5 py-2.5 text-center">Crear comercio</button>

                    </form>
                </div>
            </div>
        </section>
    )
}