import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (

    <main>

        <div className="flex min-h-screen flex-col items-center justify-center p-24">

            {/*Título de la página*/} 
            <div className="text-center w-full mb-7">
                <p className="text-black font-extrabold text-3xl">Bienvenido a la página de inicio</p>
            </div>

            {/*Imágen grande de inicio*/}
            
            <Image height={250} width={500} src="/online-shopping-cart.jpg" alt="Imagen de inicio" className="rounded-lg" />

            {/*Link a la página de usuarios*/}
            <div className="flex-auto text-center mt-5">
              <Link href="/usuarios"><p className="text-blue-500 hover:text-blue-800 font-bold text-4xl">Ver los comercios</p></Link>
            </div>

        </div>
    </main>
  )
}