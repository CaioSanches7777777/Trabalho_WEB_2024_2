"use client";

import { useRouter } from "next/navigation";

const Home = async ({}) => {
    const router = useRouter();
    return (
        <main className="h-screen">
            <h1 className="text-2xl sm:text4xl font-black traking-wide text-center pt-6 pb-10 sm:pb-24">Home Page</h1>
            <div className="flex flex-col text-center">
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/registerAnimal')}>Registrar animal</button>
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/registerSpecies')}>Registrar espécie</button>
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/registerHabitat')}>Registrar habitate</button>
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/registerDiet')}>Registrar dieta</button>
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/users')}>Cadastrar usuários</button>
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/listAnimalData')}>Listar dados relacionados a animais</button>
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/listStaffData')}>Listar dados relacionados a funcionários</button>
            </div>
        </main>
    );
}

export default Home;