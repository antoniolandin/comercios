import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';

export async function POST(request) {

    {/* Obtener el mail del usuario */}
    const data = await request.json()

    try{

        {/* Abrir el archivo de usuarios */}
        const users = JSON.parse(readFileSync("data/users.txt"))

        {/* Buscar el usuario */}
        const user = users.filter(user => user.email == data)[0]

        {/* Si el usuario existe, actualizarlo */}
        if (user){
            return NextResponse.json(user)
        }
        else{
            return NextResponse.json({message: "El usuario no existe", status: 400})
        }
        
    } catch(e){  
        return NextResponse.json({message: `Error al obtener los datos del usuario: ${e}`, status: 400})
    }

}