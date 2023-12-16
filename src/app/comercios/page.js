"use client"

import { useSearchParams } from 'next/navigation'
import GetCommerce from '@/components/get-commerce'
import EditCommerce from '@/components/edit-commerce'

export default function Usuarios() {

  const searchParams = useSearchParams()

  const email = searchParams.get("email")

  console.log(email)


  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center p-24 space-y-5">

        <div className="flex-auto mt-10">
          <GetCommerce email={email} />
        </div>

        <div className="flex-auto">
          <EditCommerce email={email} />
        </div>

      </div>
    </main>
  )
}