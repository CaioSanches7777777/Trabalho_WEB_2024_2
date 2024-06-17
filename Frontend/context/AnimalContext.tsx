"use client";


import React, {createContext, useState} from 'react';
import { request } from "@/services/request";



export type AnimalData = {
    _id:string,
    name: string,
    species: string,
    age: number
}

type AnimalContextType = {
    Animals: AnimalData[];
    addAnimal: (newAnimal:AnimalData) => void;
    removeAnimal: (_id:string) => void;
}

type UserAuthentication = {
    'x-access-token' : string
}

export const AnimalContext = createContext({} as AnimalContextType);

export const AnimalContextProvider = ({ children } : {children: React.ReactNode;}) => {
    const [Animals, setAnimals] = useState<AnimalData[]>([]);

    function addAnimal ({name,species,age}:AnimalData){
        request<UserAuthentication>('http://localhost:5000/animals',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkM0MTAiLCJpYXQiOjE3MTgzNzI2MjN9.p-cY7-BtKxyJqnU8dv_eebCc9p9wu4JWcMPVfkpT2FI"
            },
            body: JSON.stringify({name,species,age}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        })
    }



    const removeAnimal = (_id:string) => {
        //setAnimals(Animals.filter((_id:AnimalData, index: number) => parseInt(_id) !== index));
    };


    return (
        <AnimalContext.Provider value={{ Animals,addAnimal,removeAnimal }}>
            {children}
        </AnimalContext.Provider>
    );
}