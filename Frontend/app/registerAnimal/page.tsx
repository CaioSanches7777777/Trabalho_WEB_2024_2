"use client";

import { AnimalContext, Animal } from "@/context/AnimalContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const NewAnimal = async ({}) => {
    const { register, handleSubmit } = useForm<Animal>();
    const { addAnimal } = useContext(AnimalContext);
    
    const router = useRouter();
    const handleLogin = async (name:string,species:string,age:number) => {
        await addAnimal(name, species, age);
    }

    return (
        <div className="grid place-items-center mt-20 ">
            <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
            <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="name">Apelido: </label>
                <input {...register('name')} type="text" name="name" id="name" placeholder="name"></input>

                <label htmlFor="species">Espécie: </label>
                <input {...register('species')} type="text" name="species" id="species" placeholder="species"></input>

                <label htmlFor="age">Idade: </label>
                <input {...register('age')} type="text" name="age" id="age" placeholder="age"></input>

                <input type="submit" value="Registrar animal" />
            </form>
        </div>
    );
}

export default NewAnimal;