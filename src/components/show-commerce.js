export default async function Commerce() {

    const commerce = {
        title,
        city,
        summary
    }
    
    const res = await fetch('/api/show-commerce', {
        method: 'GET',
        body: JSON.stringify(commerce),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
    const data = await res.json();

    {/*Obtener los datos de los comercios*/}
    const comercios = data.map((comercio) => {
        return {
            title: comercio.title,
            city: comercio.city,
            summary: comercio.summary,
        }
    })

    return (
        <section className="bg-[#4586ef]">
            <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p className="text-white">Comercios</p>
                    <div className="flex flex-col space-y-4">
                        {/*Mostrar los comercios*/}
                        {comercios.map((comercio) => {
                            return (
                                <div key={comercio.id} className="flex flex-col space-y-4">
                                    <div className="flex flex-col space-y-4">
                                        <p className="text-white">{comercio.title}</p>
                                        <p className="text-white">{comercio.city}</p>
                                        <p className="text-white">{comercio.summary}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>

    )
}