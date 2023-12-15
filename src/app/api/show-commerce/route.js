import { promises as fs } from 'fs';

export async function handler(req, res) {

    {/*Abrir el archivo de comercios*/}
    const file = fs.readFile('data/commerce.txt', 'utf-8');
    const data = JSON.parse(file);

    {/*Enviar los datos al cliente*/}
    res.status(200).json(data);
}