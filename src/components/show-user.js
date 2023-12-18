"use client"

export default function ShowUser(usuario) {

    usuario = usuario.usuario

    const reciveOffers = () => {
        if(usuario.reciveOffers == true){
            return "Sí"
        }
        else{
            return "No"
        }
    }

    {/* Mostrar el comercio si existe */}
    if(usuario != undefined){
        {/* Mostrar el comercio si es visible */}

            return (
                <div key={usuario.email} className="mt-5 bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 flex flex-col space-y-4 pt-4 pb-6 shadow-xl ring-2 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-7">
                    <div className="flex flex-col space-y-4">
                        <p className="text-black font-bold text-xl">{usuario.name}</p>
                        <p className="text-slate-700">Edad: {usuario.age}</p>
                        <p className="text-slate-700">Correo electrónico: {usuario.email}</p>
                        <p className="text-slate-700">Contraseña: {usuario.password}</p>
                        <p className="text-slate-700">Ciudad: {usuario.city}</p>
                        <p className="text-slate-700">Hobbies: {usuario.hobbies}</p>
                        <p className="text-slate-700">Recibir ofertas: {reciveOffers(usuario.reciveOffers)}</p>
                    </div>
                </div>
            )
    }
    else{
        return (
            <section>
                <h1 className="text-black text-4xl mb-4">Usuario no encontrado</h1>
            </section>
        )
    }

}