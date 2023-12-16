import Crear from '@/components/create-commerce'
import Dashboard from '@/components/admin-dashboard'

export default function AdminDashboard() {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">

          <div className="flex flex-row space-x-10">

            {/*Formulario para crear un comercio nuevo*/}
            <div className="flex-auto">
              <Crear />
            </div>

            {/*Dashboard de administrador*/}
            <div className="flex-auto">
              <Dashboard />
            </div>

          </div>
      </main>
    )
  }