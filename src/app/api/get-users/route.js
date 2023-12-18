import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';

export async function GET() {
    try{
        
        {/* Obtener la lista de usuarios */}
        const users = JSON.parse(readFileSync("data/users.txt"))
        
        return NextResponse.json(users)
    } catch(e){  
        return NextResponse.json({message: "Error al obtener el listado de usuarios", status: 400})
    }
}