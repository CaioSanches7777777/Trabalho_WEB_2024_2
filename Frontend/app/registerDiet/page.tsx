"use client";

import { DietContext, DietData } from "@/context/DietContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const NewDiet = async ({}) => {
    const { register, handleSubmit } = useForm<DietData>();
    const { addDiet } = useContext(DietContext);
    
    const router = useRouter();
    const handleInsert = async (newDiet:DietData) => {
        await addDiet(newDiet);
    }

    return (
        <div className="grid place-items-center mt-20 ">
            <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
            <form className="flex flex-col" onSubmit={handleSubmit(handleInsert)}>
                <label htmlFor="type">Tipo: </label>
                <input {...register('type')} type="text" name="type" id="type" placeholder="type"></input>

                <input type="submit" className="mt-3 bg-gray-600 text-white p-2 rounded-lg " value="Registrar dieta" />
            </form>
        </div>
    );
}

export default NewDiet;