import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

export async function DELETE(request) {
    
    const data = await request.json()

    try{
        const commerces = JSON.parse(readFileSync("data/commerce.txt"))
        const newCommerces = commerces.filter(commerce => commerce.email != data.email)

        writeFileSync("data/commerce.txt", JSON.stringify(newCommerces))

        

    } catch(e){  
        return NextResponse.json({message: `Error al eliminar el comercio: ${e}`, status: 400})
    }

    return NextResponse.json({message: "Comercio eliminado correctamente", status: 200})

}