"use client"

export default function GetCommerce(email) {

    fetch("/api/get-commerce", {
        method: "GET",
        headers: {
        //Authorization: `Bearer ${tokenJWT}`
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    })
       .then((res) => res.json())
       .then((data) => data.json())

    return (
        <section>
            <h1 className="text-black">Bienvenido a su comercio!</h1>
        </section>
    )
}