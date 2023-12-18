import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const users = JSON.parse(readFileSync("data/users.txt"))
        const user = users.filter(user => user.email == data.email && user.password == data.password)
        if (user.length > 0) {
            return NextResponse.json({message: "Logueado correctamente", status: 200})
        } else {
            return NextResponse.json({message: "Error al loguearse: credenciales incorrectos", status: 400})
        }
    } catch(e){  
        return NextResponse.json({message: `Error al loguearse: ${e}`, status: 400})
    }
}