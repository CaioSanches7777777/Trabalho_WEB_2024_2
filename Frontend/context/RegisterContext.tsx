'use client'

import { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";

export type SignIdData = {
    username: string;
    password: string;
    position: string
}

export type RegisterContextType = {
    createUser: (data: SignIdData) => void;
    authError: string | null;
}

type UserAuthentication = {
    'x-access-token' : string
}

export const RegisterContext = createContext({} as RegisterContextType);

export default function RegisterProvider( {children}: {children: React.ReactNode}){

    const [authError, setAuthError] = useState<string | null>(null)

    const router = useRouter();
    
    async function createUser({username, password, position}: SignIdData) {

        

        /*
        const result = await fetch('http://127.0.0.1:5000/auth',{   //ver se esse é o url correto do backend usado para registrar o usuario
            method: 'POST',
            body: JSON.stringify({username, password})
        });
        const token = await result.json();
        */

        
            request<UserAuthentication>('http://localhost:5000/registerUser',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkM0MTAiLCJpYXQiOjE3MTgzNzI2MjN9.p-cY7-BtKxyJqnU8dv_eebCc9p9wu4JWcMPVfkpT2FI"
                },
                body: JSON.stringify({username,password,position}),
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            })
        
    }
    return (
        <RegisterContext.Provider value={{createUser, authError}}>
            {children}
        </RegisterContext.Provider>
    );
};