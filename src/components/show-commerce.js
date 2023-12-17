"use client"

export default function ShowCommerce(objeto) {


    {/* Desempaquetar el objeto */}
    const comercio = objeto.comercio

    {/* Mostrar el comercio si existe */}
    if(comercio != undefined){

        {/* Mostrar el comercio si es visible */}
        if(comercio.visible == true){
            return (
                <div key={comercio.email} className="mt-5 bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 flex flex-col space-y-4 pt-4 pb-6 shadow-xl ring-2 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-7">
                    <div className="flex flex-col space-y-4">
                        <p className="text-black font-bold text-xl">{comercio.title}</p>
                        <p className="text-slate-700">{comercio.name}</p>
                        <p className="text-slate-700">{comercio.summary}</p>
                        <p className="text-slate-700">Actividad: {comercio.activity}</p>
                        <p className="text-slate-700">Ciudad: {comercio.city}</p>
                    </div>
                </div>
            )
        }
        else{

            {/* Si el comercio no es visible, mostrar un mensaje diciendo que no está visible */} 
            return (
                <section>
                    <h1 className="text-black text-4xl mb-4">Comercio no visible</h1>
                    <p className="text-black text-xl">El comercio aun no es visible, para que sea visible rellene la información que falta de su negocio</p>
                </section>
            )
        }
    }
    else{
        return (
            <section>
                <h1 className="text-black text-4xl mb-4">Comercio no encontrado</h1>
            </section>
        )
    }

}