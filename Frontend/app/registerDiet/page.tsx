"use client";

import { DietContext, Diet } from "@/context/DietContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const NewDiet = async ({}) => {
    const { register, handleSubmit } = useForm<Diet>();
    const { addDiet } = useContext(DietContext);
    
    const router = useRouter();
    const handleLogin = async (type:string) => {
        await addDiet(type);
    }

    return (
        <div className="grid place-items-center mt-20 ">
            <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
            <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="type">Apelido: </label>
                <input {...register('type')} type="text" name="type" id="type" placeholder="type"></input>

                <input type="submit" value="Registrar dieta" />
            </form>
        </div>
    );
}

export default NewDiet;