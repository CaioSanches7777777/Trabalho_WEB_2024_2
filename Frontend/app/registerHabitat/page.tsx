"use client";

import { HabitatContext,HabitatData } from "@/context/HabitatContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const NewHabitat = async ({}) => {
    const { register, handleSubmit } = useForm<HabitatData>();
    const { addHabitat } = useContext(HabitatContext);
    
    const router = useRouter();
    const handleInsert = async (newHabitat:HabitatData) => {
        await addHabitat(newHabitat);
    }

    return (
        <div className="grid place-items-center mt-20 ">
            <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
            <form className="flex flex-col" onSubmit={handleSubmit(handleInsert)}>
                <label htmlFor="name">Nome: </label>
                <input {...register('name')} type="text" name="name" id="name" placeholder="name"></input>

                <label htmlFor="temperature">Temperatura: </label>
                <input {...register('temperature')} type="text" name="temperature" id="temperature" placeholder="temperature"></input>

                <input type="submit" className="mt-3 bg-gray-600 text-white p-2 rounded-lg " value="Registrar habitate" />
            </form>
        </div>
    );
}

export default NewHabitat;