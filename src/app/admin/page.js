import Crear from '@/components/create-commerce'
import Commerce from '@/components/show-commerce'

export default function Dashboard() {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">

          <div class="flex flex-row">

            {/*Formulario para crear un comercio nuevo*/}
            <div class="flex-auto">
              <Crear />
            </div>

            {/*Tabla para mostrar los comercios*/}
            <div class="flex-auto">
              <Commerce />
            </div>

          </div>
      </main>
    )
  }