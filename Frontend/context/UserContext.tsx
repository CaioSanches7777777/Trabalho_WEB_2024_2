'use client'

import { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";

export type SignIdData = {
    _id: string;
    username: string;
    password: string;
}

export type LocateContextType = {
    getUser: (data: SignIdData) => void;
    authError: string | null;
}

type UserAuthentication = {
    'x-access-token' : string
}

export const LocateContext = createContext({} as LocateContextType);

export default function LocateProvider( {children}: {children: React.ReactNode}){

    const [authError, setAuthError] = useState<string | null>(null)

    const router = useRouter();
    
    async function getUser({username, password}: SignIdData) {

        let {'x-access-token': token} = await request<UserAuthentication>('http://localhost:5000/auth',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        })

        /*
        const result = await fetch('http://127.0.0.1:5000/auth',{   //ver se esse é o url correto do backend usado para registrar o usuario
            method: 'POST',
            body: JSON.stringify({username, password})
        });
        const token = await result.json();
        */

        if(!token) setAuthError('Usuário ou senha inválidos. verifique e tente novamente!');
        else{
            //cria um cookie
            setCookie(undefined, 'auth.token', token, { 
                maxAge: 60 * 60 * 1,
            });
            request<UserAuthentication>('http://localhost:5000/registerUser',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkM0MTAiLCJpYXQiOjE3MTgzNzI2MjN9.p-cY7-BtKxyJqnU8dv_eebCc9p9wu4JWcMPVfkpT2FI"
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            })
        }
    }
    return (
        <LocateContext.Provider value={{getUser, authError}}>
            {children}
        </LocateContext.Provider>
    );
};