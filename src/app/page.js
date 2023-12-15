"use client"

import { useRouter } from 'next/navigation'

export default function Home() {



  {/*Redirigir a la página de home*/}
  const router = useRouter()
  router.push("/home")
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Redirigiendo al home</h1>
    </main>
  )
}