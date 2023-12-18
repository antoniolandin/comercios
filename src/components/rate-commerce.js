"use client"

import { FaStar } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Valorar({comercio}) {


    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [comentario, setComentario] = useState("")

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();   

        if(rating == null){
            alert("Debes valorar el comercio")
        }
        else if(comentario == ""){
            alert("Debes escribir un comentario")
        }
        else{
            console.log("Valoración: ", rating)

            {/* Crear la reseña */}
            const reseña = {
                rating: rating,
                comentario: comentario,
            }

            {/* Añadir la reseña al comercio */}
            let comercioActualizado = Object.assign({}, comercio)
            comercioActualizado.reviews.push(reseña)

            {/* Actualizar el comercio en la base de datos */}
            fetch("/api/edit-commerce", {
                method: "POST",
                headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(comercioActualizado)
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .then(() => router.push("/usuarios"))
        }

    }

    return(
        <section>
        <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 from-gray-900 to-gray-600 bg-gradient-to-r">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">

                {/* Título */}
                <div>
                    <p className="text-white text-xl font-bold">Valorar comercio</p>
                </div>

                {/* Formulario */}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                    {/* Comentario */}
                    <div>
                        <label className="text-white text-sm font-bold">Comentario</label>
                        <textarea onChange={(e) => setComentario(e.target.value)} className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-xl text-sm px-5 py-2.5" placeholder="Escribe tu comentario aquí"></textarea>
                    </div>


                    {/* Nota con 5 estrellas */}

                    <div className="flex flex-row">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i}>
                                    <input className="hidden" type="radio" name="rating" onClick={() => setRating(ratingValue)} value={ratingValue} />
                                    <FaStar className="cursor-pointer" size={20} color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)}/>
                                </label>
                            )
                        }
                        )}
                    </div>

                    {/* Botón de valorar */}
                    <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none rounded-full text-sm px-5 py-2.5 text-center">Valorar</button>
                </form>

            </div>
        </div>

    </section>
    )

}