"use client"

import { useSearchParams } from 'next/navigation'

export default function Home() {

    {/* Obtener el usuario de la URL */}
    const searchParams = useSearchParams()
    const email = searchParams.get("email")


    return (
        <main>
            <div className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1 className="text-black">{email}</h1>
            </div>
        </main>
    )
}