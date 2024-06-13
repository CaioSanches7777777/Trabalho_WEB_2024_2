'use client'

import React, { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";
import { cookies } from "next/headers";

export type Specie = {
    _id:string;
    name: string;
    qtd: number,
    habitat: string,
    diet: string,
    img_url: string;
}
type UserAuthentication = {
    'x-access-token' : string
}
type SpecieType = {
    Species: Specie[]
    addSpecie: (_id:string,name:string,qtd:number,habitat:string,diet:string,img_url:string)=>void;
}


export const SpecieContext = createContext({} as SpecieType);

export const SpecieContextProvider = ( {children}: {children: React.ReactNode;}) => {
    const [Species, setSpecies] = useState<Specie[]>([])

    const addSpecie = (_id:string,name:string,qtd:number,habitat:string,diet:string,img_url:string)=>{
        let newSpecie = {
            _id:__dirname,
            name:name,
            qtd:qtd,
            habitat:habitat,
            diet:diet,
            img_url:img_url
        }
        setSpecies([...Species,newSpecie]);
        request<UserAuthentication>('http://localhost:5000/species',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': document.cookie
            },
            body: JSON.stringify({_id,name,qtd,habitat,diet,img_url}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        })
    }


        
    
    
    return (
        <SpecieContext.Provider value={{Species, addSpecie}}>
            {children}
        </SpecieContext.Provider>
    );
};