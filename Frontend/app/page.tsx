"use client"; //talves não precise

import { useRouter } from "next/navigation"; 

export default function Home() {
    const router = useRouter();

    return(
        <main className="h-screen">
            <h1 className="text-2xl sm:text4xl font-black traking-wide text-center pt-6 pb-10 sm:pb-24">Home Page</h1>
            <div className="text-center">
                <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/login')}>logar</button>
            </div>
        </main>
    );
}