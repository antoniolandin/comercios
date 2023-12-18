"use client"

import ShowCommerce from "@/components/show-commerce"

export default function GetCommerce({comercio}) {

    {/* Mostrar el comercio si existe */}
    if(comercio != undefined){

        const commerce = Object.assign({}, comercio)

        const mostrarNegocio = () => {
            if(commerce.visible == false & commerce.city == "" & commerce.summary == "" & commerce.activity == ""){
                return (
                    <div className="sm">
                        <p className="text-black text-sm">El comercio aun no es visible</p>
                        <p className="text-black text-sm">para que sea visible rellene la información que falta de su negocio</p>
                    </div>
                )
            }
            else{
                return (
                    <div>
                        <ShowCommerce comercio={commerce} />
                    </div>
                )
            }
        }

        return (
            <section>
                <h1 className="text-black text-4xl mb-4">{commerce.name}</h1>

                {/* Mostrar el comercio */}
                <div>
                    {mostrarNegocio()}
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