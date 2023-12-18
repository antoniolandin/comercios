"use client"

import { useSearchParams } from 'next/navigation'
import Edit from '@/components/user-edit'


export default function Home() {

    {/* Obtener el usuario de la URL */}
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    return (
        <main>
            <div className="flex min-h-screen flex-col items-center justify-center p-24">
                <Edit email={email} />
            </div>
        </main>
    )
}