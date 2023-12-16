"use client"

import { useSearchParams } from 'next/navigation'
import Dashboard from '@/components/user-dashboard'

export default function Usuarios() {

  const searchParams = useSearchParams()

  const email = searchParams.get("email")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Dashboard/>
    </main>
  )
}