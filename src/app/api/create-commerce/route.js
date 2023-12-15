import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()

    {/*Comprobar que el mail del comercio no esté ya cogido*/}
    const commerce = JSON.parse(readFileSync("data/commerce.txt"))
    const commerceFiltered = commerce.filter((item) => item.mail == data.mail)

    if(commerceFiltered.length > 0){
        return NextResponse.json({message: "El mail ya está en uso", status: 400})
    }

    try{
        const users = JSON.parse(readFileSync("data/commerce.txt"))
        writeFileSync("data/commerce.txt", JSON.stringify([...users, data]))
    } catch(e){  
        writeFileSync("data/commerce.txt", JSON.stringify([data]))
    }

    return NextResponse.json({message: "Comercio creado correctamente", status: 200})
}