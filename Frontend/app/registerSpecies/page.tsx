"use client";

import { SpecieContext, Specie } from "@/context/SpecieContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const NewSpecies = async ({}) => {
    const { register, handleSubmit } = useForm<Specie>();
    const { addSpecie } = useContext(SpecieContext);
    
    const router = useRouter();
    const handleLogin = async (name:string,qtd: number,habitat: string,diet: string,img_url: string) => {
        await addSpecie(name, qtd, habitat,diet,img_url);
    }

    return (
        <div className="grid place-items-center mt-20 ">
            <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
            <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="name">Apelido: </label>
                <input {...register('name')} type="text" name="name" id="name" placeholder="name"></input>

                <label htmlFor="qtd">Espécie: </label>
                <input {...register('qtd')} type="text" name="qtd" id="qtd" placeholder="qtd"></input>

                <label htmlFor="habitat">Idade: </label>
                <input {...register('habitat')} type="text" name="habitat" id="habitat" placeholder="habitat"></input>

                <label htmlFor="diet">Espécie: </label>
                <input {...register('diet')} type="text" name="diet" id="diet" placeholder="diet"></input>

                <label htmlFor="img_url">Idade: </label>
                <input {...register('img_url')} type="text" name="img_url" id="img_url" placeholder="img_url"></input>

                <input type="submit" value="Registrar animal" />
            </form>
        </div>
    );
}

export default NewSpecies;