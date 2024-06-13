"use client";

import { AuthContext, SignIdData } from "@/context/AuthContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const Login = async ({}) => {
    const {register, handleSubmit} = useForm<SignIdData>();
    const { login, authError } = useContext(AuthContext);

    const handleLogin = async (data : SignIdData) => {
        await login(data);
    }

    return (
        <div className="grid place-items-center mt-20 ">
            <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="username">Usuário: </label>
                <input {...register('username')} type="text" name="username" id="username" placeholder="username"></input>

                <label htmlFor="password">Senha: </label>
                <input {...register('password')} type="password" name="password" id="password" placeholder="password"></input>

                <input className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" value="Acessar" />
            </form>
            {authError && <p>{authError}</p>}
        </div>
    );
}

export default Login;