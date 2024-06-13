'use client'

import { createContext, useState } from "react";
import { request } from "@/services/request";
import { setCookie } from "@/node_modules/nookies/dist/index";
import { useRouter } from "@/node_modules/next/navigation";

export type SignIdData = {
    username: string;
    password: string;
}

type AuthContextType = {
    login: (data: SignIdData) => void;
    authError: string | null
}

type UserAuthentication = {
    'x-access-token' : string
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider( {children}: {children: React.ReactNode}){

    const [authError, setAuthError] = useState<string | null>(null)

    const router = useRouter();
    
    async function login({username, password}: SignIdData) {
        /*
        let url = 'http://localhost:5000/registerUser/'+username;

        request<UserAuthentication>(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        })
        */
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
            setCookie(null, 'auth.token', token, { 
                maxAge: 60 * 60 * 1,
            });
            router.push('/home');
        }
    }
    return (
        <AuthContext.Provider value={{login, authError}}>
            {children}
        </AuthContext.Provider>
    );
};