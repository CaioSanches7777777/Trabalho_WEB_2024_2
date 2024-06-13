'use client';

import React, {useContext, useEffect, useState} from 'react';
import { DietContext, Diet } from "@/context/DietContext";
import Select from 'react-dropdown-select';
import { Habitat } from '@/context/HabitatContext';

const ListDiet = ({}) => {
  const [dietList, setDietList] = useState<Diet[]>([]);
  const [habitatList, setHabitatList] = useState<Habitat[]>([]);
  //const [isLoading, setLoading] = useState(true);
  const [selectedHabitat, setSelectedHabitat] = useState<string>('all');

  useEffect(() => {
    fetch('http://localhost:5000/diets',{
        method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setDietList(data);
        //setLoading(false);
      });
    
  }, []);
  
  if (!dietList.length) return <p className="text-center">Não há animais visíveis para seu usuário</p>;
  

 
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      
      <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-center">Tipos de Dieta</p>
        {dietList.map(({ _id, type}) => (
          <div key={_id} className="bg-white border border-gray-300 rounded p-4 shadow-md">
            <p className="text-xl font-semibold mb-2">{type}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListDiet;