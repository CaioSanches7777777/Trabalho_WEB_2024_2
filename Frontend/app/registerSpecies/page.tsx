"use client";

import { DietData } from "@/context/DietContext";
import { SpecieContext, SpecieData } from "@/context/SpecieContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const NewSpecies = async ({}) => {
    const { register, handleSubmit } = useForm<SpecieData>();
    const { addSpecie } = useContext(SpecieContext);
    
    const router = useRouter();
    const handleInsert = async (newSpecie:SpecieData) => {
        await addSpecie(newSpecie);
    }
    /*
    const [dietList, setDietList] = useState<DietData[]>([]);
    useEffect(() => {
        fetch('http://localhost:5000/diets',{
            method:'GET'
        })
          .then((res) => res.json())
          .then((data) => {
            setDietList(data);
          });
      }, []);
    */
    return (
        <div className="grid place-items-center mt-20 ">
            <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
            <form className="flex flex-col" onSubmit={handleSubmit(handleInsert)}>
                <label htmlFor="name">Nome: </label>
                <input {...register('name')} type="text" name="name" id="name" placeholder="name"></input>

                <label htmlFor="qtd">Quantidade: </label>
                <input {...register('qtd')} type="text" name="qtd" id="qtd" placeholder="qtd"></input>
                
                <label htmlFor="habitat">Habitate: </label>
                <input {...register('habitat')} type="text" name="habitat" id="habitat" placeholder="habitat"></input>

                <label htmlFor="diet">Dieta: </label>
                <input {...register('diet')} type="text" name="diet" id="diet" placeholder="diet"></input>

                <label htmlFor="img_url">Idade: </label>
                <input {...register('img_url')} type="text" name="img_url" id="img_url" placeholder="img_url"></input>

                <input type="submit" className="mt-3 bg-gray-600 text-white p-2 rounded-lg " value="Registrar animal" />
            </form>
        </div>
    );
}

export default NewSpecies;

/* 
                <label htmlFor="diet">Dieta: </label>
                <select {...register('diet')}>
                    {dietList.map((diet:DietData) => (
                        <option value={diet._id} >{diet.type}</option>
                    ))}
                </select> 
*/