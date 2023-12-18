"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import GetCommerce from '@/components/get-commerce'
import EditCommerce from '@/components/edit-commerce'
import Consultar from '@/components/consultar-usuarios'

export default function Home() {

  {/* Obtener el usuario de la URL */}
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [commerce, setCommerce] = useState([])
  const [fetchDone, setFetchDone] = useState(false)

  const set = (data) => {

    if (data.status != 400){
      setCommerce(data.filter((item) => item.email == email)[0])
    }
  }

  {/* Obtener el comercio solo al cargar la página */}
  if (!fetchDone) {
    {/* Obtener los comercios */}
    fetch("/api/get-commerces", {
      method: "GET",
      headers: {
        //Authorization: `Bearer ${tokenJWT}`
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => set(data))

    {/* Asegurarse de que el fetch de la API se hace una sola vez */}
    setFetchDone(true)
  }

  return (
    <main>

      <div className="flex min-h-screen flex-col items-center justify-center p-24 space-y-5">

        <div className='flex flex-row space-x-10'>
          <div className='flex flex-col'>          
            <div className="flex-auto mt-10 mb-5">
              <GetCommerce comercio={commerce} />
            </div>

            <div className="flex-auto">
              <EditCommerce comercio={commerce} setComercio={setCommerce} />
            </div>    
          </div>


          <div className="flex-auto mt-10">
            <Consultar comercio={commerce}/>
          </div>

        </div>

      </div>

    </main>
  )
}