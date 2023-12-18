import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

export async function POST(request) {

    {/* Obtener los datos del usuario que editar */}
    const data = await request.json()

    try{

        {/* Obtener la lista de comercios */}
        const users = JSON.parse(readFileSync("data/users.txt"))

        {/* Actualizar los usuarios */}
        const newUsers = users.map(user => {
            if(user.email == data.email){
                user = data
            }
            return user
        })

        {/*Guardar la lista de comercios*/}
        writeFileSync("data/users.txt", JSON.stringify(newUsers))

        return NextResponse.json({message: "Usuario editado correctamente", status: 200})
        
    } catch(e){  
        return NextResponse.json({message: `Error al editar el usuario: ${e}`, status: 400})
    }

}