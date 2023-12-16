import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()

    const email = data.email

    try{
        {/*Buscar el comercio*/}
        const commerce = JSON.parse(readFileSync("data/commerce.txt"))
        const commerceFiltered = commerce.filter((item) => item.email == email)

        if (commerceFiltered.length > 0) {
            return NextResponse.json(commerceFiltered[0])
        } else {
            return NextResponse.json({message: "El comercio con email " + data.email + " no existe", status: 400})
        }

    } catch(e){  
        return NextResponse.json({message: "El comercio con email " + data.email + " no existe (fallo en el try)", status: 400})
    }
}