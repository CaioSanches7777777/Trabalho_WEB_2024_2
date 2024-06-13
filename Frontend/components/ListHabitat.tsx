'use client';

import React, {useContext, useEffect, useState} from 'react';
import { HabitatContext, Habitat } from "@/context/HabitatContext";
import Select from 'react-dropdown-select';
import { Diet } from '@/context/DietContext';

const ListHabitat = ({}) => {
  const [habitatList, setHabitatList] = useState<Habitat[]>([]);
  const [dietList, setDietList] = useState<Diet[]>([]);
  //const [isLoading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState<string>('all');

  useEffect(() => {
    fetch('http://localhost:5000/habitats',{
        method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setHabitatList(data);
      });
    
  }, []);
  
  if (!habitatList.length) return <p className="text-center">Não há habitats visíveis para seu usuário</p>;
  

  
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      
      <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-center">Tipps de Habitats</p>
        {habitatList.map(({ _id, name, temperature}) => (
          <div key={_id} className="bg-white border border-gray-300 rounded p-4 shadow-md">
            <p className="text-xl font-semibold mb-2">{name}</p>
            <p className="text-gray-600">Temperatura: {temperature}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListHabitat;