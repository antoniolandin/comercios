import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

export async function DELETE(request) {
    
    {/*Obtner los datos del comercio que queremos eliminar*/}
    const data = await request.json()

    try{

        {/*Quitar el comercio que queremos eliminar de la lista de comercios*/}
        const commerces = JSON.parse(readFileSync("data/commerce.txt"))
        const newCommerces = commerces.filter(commerce => commerce.email != data.email)

        {/*Guardar la lista de comercios sin el comercio que queremos eliminar*/}
        writeFileSync("data/commerce.txt", JSON.stringify(newCommerces))
        
    } catch(e){  
        return NextResponse.json({message: `Error al eliminar el comercio: ${e}`, status: 400})
    }

    return NextResponse.json({message: "Comercio eliminado correctamente", status: 200})
}