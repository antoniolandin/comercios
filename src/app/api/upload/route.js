import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync } from 'fs';

export async function POST(request) {


  const data = await request.formData()
  const file = data.get('file') 

  if (!file) {
    return NextResponse.json({ message: "Error al subir el archivo", code: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `./public/${file.name}`
  await writeFileSync(path, buffer)
  console.log(`open ${path} to see the uploaded file`)

  return NextResponse.json({ message: `Archivo subido con éxito en ${path}` , code: 200 })
}
