import Crear from '@/components/create-commerce'
import Commerce from '@/components/show-commerce'

export default function Dashboard() {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">

          <div className="flex flex-row">

            {/*Formulario para crear un comercio nuevo*/}
            <div className="flex-auto">
              <Crear />
            </div>

            {/*Tabla para mostrar los comercios*/}
            <div className="flex-auto">
              <p className='text-black'>Comercios</p>
            </div>

          </div>
      </main>
    )
  }