"use client";

import { RegisterContext, SignIdData } from "@/context/RegisterContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const Users = async ({}) => {
    const { register, handleSubmit } = useForm<SignIdData>();
    const { createUser, authError } = useContext(RegisterContext);
    
    const router = useRouter();
    const handleLogin = async (data : SignIdData) => {
        await createUser(data);
    }

    return (
        <div className="grid place-items-center mt-20 ">
            <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
            <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="username">Usuário: </label>
                <input {...register('username')} type="username" name="username" id="username" placeholder="username"></input>

                <label htmlFor="password">Senha: </label>
                <input {...register('password')} type="text" name="password" id="password" placeholder="password"></input>

                <label htmlFor="position">Posição: </label>
                <input {...register('position')} type="text" name="position" id="position" placeholder="position"></input>

                <input type="submit" value="Criar usuário" />
            </form>
            {authError && <p>{authError}</p>}
        </div>
    );
}

export default Users;