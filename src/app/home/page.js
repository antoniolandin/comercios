export default function Home() {
  return (

    <main>

        <div className="flex min-h-screen flex-col items-center justify-center p-24">

            {/*Título de la página*/} 
            <div className="text-center w-full">
                <p className="text-black font-extrabold text-3xl">Bienvenido a la página de inicio</p>
            </div>

            {/*Imágen grande de inicio*/}
            <div className="flex-auto mt-5">
                <img src="/online-shopping-cart.jpg" alt="Imagen de inicio" className="rounded-lg" />
            </div>
            
        </div>
    </main>
  )
}