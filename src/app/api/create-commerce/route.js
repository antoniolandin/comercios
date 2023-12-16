import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()

    try{
        const commerces = JSON.parse(readFileSync("data/commerce.txt"))
        writeFileSync("data/commerce.txt", JSON.stringify([...commerces, data]))
    } catch(e){  
        writeFileSync("data/commerce.txt", JSON.stringify([data]))
    }

    return NextResponse.json({message: "Comercio creado correctamente", status: 200})
}