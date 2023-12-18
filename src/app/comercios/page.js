"use client"

import { useSearchParams } from 'next/navigation'
import GetCommerce from '@/components/get-commerce'
import EditCommerce from '@/components/edit-commerce'
import Consultar from '@/components/consultar-usuarios'

export default function Home() {

  {/* Obtener el usuario de la URL */}
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <main>

      <div className="flex min-h-screen flex-col items-center justify-center p-24 space-y-5">

        <div className='flex flex-row space-x-10'>
          <div className='flex flex-col'>          
            <div className="flex-auto mt-10 mb-5">
              <GetCommerce email={email} />
            </div>

            <div className="flex-auto">
              <EditCommerce email={email} />
            </div>    
          </div>


          <div className="flex-auto mt-10">
            <Consultar />
          </div>

        </div>

      </div>

    </main>
  )
}