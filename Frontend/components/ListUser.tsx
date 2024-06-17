'use client';

import React, {useContext, useEffect, useState} from 'react';
import { LocateContext, SignIdData } from "@/context/UserContext";
import Select from 'react-dropdown-select';

const ListUser = ({}) => {
    const [userList, setUserList] = useState<SignIdData[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/registerUser',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkM0MTAiLCJpYXQiOjE3MTgzNzI2MjN9.p-cY7-BtKxyJqnU8dv_eebCc9p9wu4JWcMPVfkpT2FI"
        },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      });
    
  }, []);
  
  if (!userList.length) return <p className="text-center">Não há usuários visíveis para seu usuário</p>;
  

  
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      
      <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-center">Tipos de usuários</p>
        {userList.map(({ _id, username,position}) => (
          <div key={_id} className="bg-white border border-gray-300 rounded p-4 shadow-md">
            <p className="text-xl font-semibold mb-2">{username}</p>
            <p className="text-gray-600">Posição: {position}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListUser;