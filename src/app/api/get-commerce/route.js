import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';

export async function GET(request) {
    const email = await request.json()
    try{
        const commerces = JSON.parse(readFileSync("data/commerce.txt"))
        const commerce = commerces.filter(commerce => commerce.email == email)

        if (user.length > 0) {
            return commerce[0]
        } else {
            return NextResponse.json({message: "El comercio no existe...", status: 400})
        }

    } catch(e){  
        return NextResponse.json({message: "El comercio no existe...", status: 400})
    }
}