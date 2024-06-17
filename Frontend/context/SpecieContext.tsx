'use client'

import React, { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";
import { cookies } from "next/headers";

export type SpecieData = {
    _id:string,
    name: string,
    qtd: number,
    habitat: string,
    diet: string,
    img_url: string;
}
type UserAuthentication = {
    'x-access-token' : string
}
type SpecieType = {
    Species: SpecieData[]
    addSpecie: (newSpecie:SpecieData)=>void;
}


export const SpecieContext = createContext({} as SpecieType);

export const SpecieContextProvider = ( {children}: {children: React.ReactNode;}) => {
    const [Species, setSpecies] = useState<SpecieData[]>([])

    const addSpecie = ({name,qtd,habitat,diet,img_url}:SpecieData)=>{
        try{
            request<UserAuthentication>('http://localhost:5000/species',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkM0MTAiLCJpYXQiOjE3MTgzNzI2MjN9.p-cY7-BtKxyJqnU8dv_eebCc9p9wu4JWcMPVfkpT2FI"
                },
                body: JSON.stringify({name,qtd,habitat,diet,img_url}),
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            })
        }catch(err){

        }
    }


        
    
    
    return (
        <SpecieContext.Provider value={{Species, addSpecie}}>
            {children}
        </SpecieContext.Provider>
    );
};