import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

export async function POST(request) {

    {/*Obtner los datos del comercio que editar*/}
    const data = await request.json()

    try{

        {/*Obtener la lista de comercios*/}
        const commerces = JSON.parse(readFileSync("data/commerce.txt"))

        {/*Actualizar el comercio*/}
        const newCommerces = commerces.map(commerce => {
            if(commerce.email == data.email){
                commerce = data
            }
            return commerce
        })

        {/*Guardar la lista de comercios*/}
        writeFileSync("data/commerce.txt", JSON.stringify(newCommerces))

        return NextResponse.json({message: "Comercio editado correctamente", status: 200})
        
    } catch(e){  
        return NextResponse.json({message: `Error al editar el comercio: ${e}`, status: 400})
    }

}