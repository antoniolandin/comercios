"use client"

import { useState } from "react"
import Link from 'next/link'
import ShowCommerce from "@/components/show-commerce"

export default function Dashboard(usuario) {

    {/* UseState para guardar los comercios */}
    const [comercios, setComercios] = useState([])

    {/* UseState para guardar los comercios filtrados */}
    const [comerciosFiltrados, setComerciosFiltrados] = useState([])

    {/* UseState para guardar el usuario */}
    const [user, setUser] = useState([])

    {/* UseState para asegurarse de que el fetch de la API se hace una sola vez */}
    const [fetchDone, setFetchDone] = useState(false)

    {/* UseState para guardar el texto del buscador */}
    const [busqueda, setBusqueda] = useState([])

    {/* UseState para guardar la categoría que se filtra */}
    const [categoria, setCategoria] = useState([])

    {/* UseState para guardar la ciudad que se filtra */}
    const [ciudad, setCiudad] = useState([])

    {/* Función para guardar los comercios después del fetch de la API*/}
    const set = (data) => {

        const comerciosFiltrados = data.filter((item) => item.visible == true)

        setComercios(comerciosFiltrados)
        setComerciosFiltrados(comerciosFiltrados)
    }

    if(!fetchDone){
        {/* Obtener los comercios */}
        fetch("/api/get-commerces", {
            method: "GET",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => set(data))

        {/* Obtener los datos del usuario */}
        fetch("/api/get-user", {
            method: "POST",
            headers: {
            //Authorization: `Bearer ${tokenJWT}`
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario.usuario)
        })
        .then((res) => res.json())
        .then((data) => setUser(data))

        {/* Asegurarse de que el fetch de la API se hace una sola vez */}
        setFetchDone(true)
    }

    {/* Función para mostrar el usuario */}
    const mostrarUsuario = () => {
        if(usuario.usuario != undefined){
            return (
                <section>
                    <h1 className="text-black text-4xl mb-4">Logueado como:</h1>
                    <h1 className="text-black font-bold text-xl">{user.name} - {user.email}</h1>

                    {/* Mostrar link de editar usuario */}

                    <div className="mt-5">
                        <h1 className="text-black">Parar editar los detalles de su cuenta o para darse de baja <Link className="text-blue-500 hover:text-blue-800" href={{pathname: "editar-usuario", query: {email: user.email}, }} >haga click aquí</Link></h1>
                    </div>


                </section>
            )
        }
        else{
            return (
                <section>
                    <h1 className="text-black text-4xl mb-4">No está logueado</h1>                    
                    <h1 className="text-black">Regístrese para poder valorar comercios desde la página de <Link className="text-blue-500 hover:text-blue-800" href="login-usuarios">Acceso Usuarios</Link></h1>
                </section>
            )
        }
    }

    {/* Mostrar los comercios si hay comercios */}
    if(comercios.length > 0){

        {/* Filtrar los comercios en función de la barra de búsqueda y de los filtros seleccionados */}
        const filtrar = (search, category, city) => { {/* No se han usado las variables del UseState directamente porque no se actualizan al instante (funcionan de forma asíncrona) */}

            let filtrados = comercios

            {/* Si hay texto en el buscador, filtrar los comercios en función del nombre */}
            if(search != "" && search != undefined){
                filtrados = comercios.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            }

            {/* Si hay una categoría seleccionada, filtrar los comercios en función de la categoría */}
            if(category != ""){
                const comerciosFiltradosCategoria = filtrados.filter((item) => item.activity == category)
                filtrados = comerciosFiltradosCategoria
            }

            {/* Si hay una ciudad seleccionada, filtrar los comercios en función de la ciudad */}
            if(city != "" ){
                const comerciosFiltradosCiudad = comerciosFiltrados.filter((item) => item.city == city)
                filtrados = comerciosFiltradosCiudad
            }

            {/* Guardar los comercios filtrados */}
            setComerciosFiltrados(filtrados)
        }

        return (
            <section>
                
                {/*Mostrar el usuario*/}
                {mostrarUsuario()}

                {/* Buscador de comercios por nombre */}
                <div className="flex flex-col space-y-4 mt-5">
                    <input onChange={(e) => {setBusqueda(e.target.value); filtrar(e.target.value, categoria, ciudad)} } type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar comercio..." />
                </div>

                {/* Filtro de comercios por categoría */}
                <div className="flex flex-col space-y-4 mt-5">
                    <label htmlFor="categoria" className="text-black text-2xl">Filtrar por categoría</label>
                    <select onChange={(e) => {setCategoria(e.target.value); filtrar(busqueda, e.target.value, ciudad)}} name="categoria" id="categoria" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Todas las categorías</option>
                        <option value="Alimentación">Alimentación</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Muebles">Muebles</option>
                    </select>
                </div>

                {/* Buscar por cuidad */}
                <div className="flex flex-col space-y-4 mt-5">
                    <label htmlFor="ciudad" className="text-black text-2xl">Buscar por ciudad</label>
                    <select onChange={(e) => {setCiudad(e.target.value); filtrar(busqueda, categoria, e.target.value)}} name="ciudad" id="ciudad" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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

                <div className="flex flex-col space-y-4">
                    {/*Mostrar los comercios*/}
                    {comerciosFiltrados.map((comercio) => {
                        return (
                            <ShowCommerce key={comercio.email} comercio={comercio} valorar={usuario.usuario != undefined}/>
                        )
                    })}
                </div>
            </section>
        )
    }
    else{ {/* Mostrar que no hay comercios si no hay comercios */}
        return (
            <section>

                {/*Mostrar el usuario*/}
                {mostrarUsuario()}

                {/* Mostrar que no hay comercios */}
                <div className="mt-5">
                    <h1 className="text-black text-4xl mb-4">Comercios</h1>
                    <h1 className="text-black">No hay comercios</h1>
                </div>
                
            </section>
        )
    }
}