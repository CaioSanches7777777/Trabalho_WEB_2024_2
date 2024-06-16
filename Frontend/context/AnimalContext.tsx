"use client";


import React, {createContext, useState} from 'react';
import { request } from "@/services/request";



export type Animal = {
    name: string,
    species: string,
    age: number
}

type AnimalContextType = {
    Animals: Animal[];
    addAnimal: (name:string, species:string,age:number) => void;
    removeAnimal: (_id:string) => void;
    //changeCategory: (_id:string, new_Category:string) => void;
}

type UserAuthentication = {
    'x-access-token' : string
}

export const AnimalContext = createContext({} as AnimalContextType);

export const AnimalContextProvider = ({ children } : {children: React.ReactNode;}) => {
    const [Animals, setAnimals] = useState<Animal[]>([]);

    const addAnimal = (name:string,species:string,age:number)=>{
        let token = document.cookie;
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

/*  

    const addAnimal = (_id:string, name:string, qtd:number, specie:Category, preco:number, description:string) => {
        let newAnimal = {
            _id: _id,
            name: name,
            qtd: qtd,
            specie: specie,
            preco: preco,
            description: description
        }
        setAnimals([...Animals, newAnimal]);
    };
*/

    const removeAnimal = (_id:string) => {
        setAnimals(Animals.filter((_:Animal, index: number) => parseInt(_id) !== index));
    };

/*
    const changeCategory = (_id:string, new_Category:Category) => {
        Animals[parseInt(_id)].specie = new_Category;
    };
*/
    return (
        <AnimalContext.Provider value={{ Animals,addAnimal,removeAnimal }}>
            {children}
        </AnimalContext.Provider>
    );
}