import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const users = JSON.parse(readFileSync("data/users.txt"))

        const user = users.filter(user => user.email == data.email)

        if (user.length > 0) {
            return NextResponse.json({message: "El usuario ya existe, no se ha podido crear el usuario", status: 400})
        }
        else{
            writeFileSync("data/users.txt", JSON.stringify([...users, data]))

            return NextResponse.json({message: "Usuario creado correctamente", status: 200})
        }
    } catch(e){  
        writeFileSync("data/users.txt", JSON.stringify([data]))
    }

    return NextResponse.json({message: "Usuario creado correctamente", status: 200})
}