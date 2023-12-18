import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

export async function DELETE(request) {
    
    {/* Obtener los datos del usuario que queremos eliminar */}
    const data = await request.json()

    try{

        {/* Quitar el usuario que queremos eliminar de la lista de usuarios */}
        const users = JSON.parse(readFileSync("data/users.txt"))
        const newUsers = users.filter(user => user.email != data.email)

        {/* Guardar la lista de usuarios sin el usuario que queremos eliminar */}
        writeFileSync("data/users.txt", JSON.stringify(newUsers))
        
    } catch(e){  
        return NextResponse.json({message: `Error al eliminar el usuario: ${e}`, status: 400})
    }

    return NextResponse.json({message: "Usuario eliminado correctamente", status: 200})
}