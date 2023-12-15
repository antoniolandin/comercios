import tailwind from 'tailwindcss';

export default function Home() {

  return (

    <main>

        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          
            {/*Título de la página*/} 
            <div clasName="text-center w-full">
                <p className="text-white font-extrabold">Bienvenido a la página de inicio</p>
            </div>

            {/*Imágen grande de inicio*/}
            <div className="flex-auto mt-5 bg-blue-500">
                <img src="/online-shopping-cart.jpg" alt="Imagen de inicio" className="rounded-lg" />
            </div>
            
        </div>
    </main>
  )
}