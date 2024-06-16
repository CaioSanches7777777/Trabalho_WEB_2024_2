'use client'

import React, { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";
import { cookies } from "next/headers";

export type Diet = {
    type:string
}
type UserAuthentication = {
    'x-access-token' : string
}
type DietType = {
    Diets: Diet[]
    addDiet: (type:string)=>void;
}


export const DietContext = createContext({} as DietType);

export const DietContextProvider = ( {children}: {children: React.ReactNode;}) => {
    const [Diets, setDiets] = useState<Diet[]>([])

    const addDiet = (type:string)=>{
        let newDiet = {
            type:type
        }
        setDiets([...Diets,newDiet]);
        request<UserAuthentication>('http://localhost:5000/diets',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkM0MTAiLCJpYXQiOjE3MTgzNzI2MjN9.p-cY7-BtKxyJqnU8dv_eebCc9p9wu4JWcMPVfkpT2FI"
            },
            body: JSON.stringify({type}),
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