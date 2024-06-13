'use client'

import React, { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";
import { cookies } from "next/headers";

export type Diet = {
    _id:string;
    type:string
}
type UserAuthentication = {
    'x-access-token' : string
}
type DietType = {
    Diets: Diet[]
    addDiet: (_id:string,type:string)=>void;
}


export const DietContext = createContext({} as DietType);

export const DietContextProvider = ( {children}: {children: React.ReactNode;}) => {
    const [Diets, setDiets] = useState<Diet[]>([])

    const addDiet = (_id:string,type:string)=>{
        let newDiet = {
            _id:__dirname,
            type:type
        }
        setDiets([...Diets,newDiet]);
        request<UserAuthentication>('http://localhost:5000/diets',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': document.cookie
            },
            body: JSON.stringify({_id,type}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        })
    }


        
    
    
    return (
        <DietContext.Provider value={{Diets, addDiet}}>
            {children}
        </DietContext.Provider>
    );
};