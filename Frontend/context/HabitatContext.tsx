'use client'

import React, { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";
import { cookies } from "next/headers";

export type Habitat = {
    name:string;
    temperature:number
}
type UserAuthentication = {
    'x-access-token' : string
}
type HabitatType = {
    Habitats: Habitat[]
    addHabitat: (name:string,temperature:number)=>void;
}


export const HabitatContext = createContext({} as HabitatType);

export const HabitatContextProvider = ( {children}: {children: React.ReactNode;}) => {
    const [Habitats, setHabitats] = useState<Habitat[]>([])

    const addHabitat = (name:string,temperature:number)=>{
        let newHabitat = {
            name:name,
            temperature:temperature
        }
        setHabitats([...Habitats,newHabitat]);
        request<UserAuthentication>('http://localhost:5000/habitats',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkM0MTAiLCJpYXQiOjE3MTgzNzI2MjN9.p-cY7-BtKxyJqnU8dv_eebCc9p9wu4JWcMPVfkpT2FI"
            },
            body: JSON.stringify({name,temperature}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        })
    }


        
    
    
    return (
        <HabitatContext.Provider value={{Habitats, addHabitat}}>
            {children}
        </HabitatContext.Provider>
    );
};