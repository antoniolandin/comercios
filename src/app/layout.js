import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Comercios',
  description: 'Buscar y registrar comercios',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
