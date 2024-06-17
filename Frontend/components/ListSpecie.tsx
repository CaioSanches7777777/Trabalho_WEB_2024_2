'use client';

import React, {useContext, useEffect, useState} from 'react';
import { SpecieContext, Specie } from "@/context/SpecieContext";
import Select from 'react-dropdown-select';
import { DietData } from '@/context/DietContext';

const ListSpecie = ({}) => {
  const [specieList, setSpecieList] = useState<Specie[]>([]);
  const [dietList, setDietList] = useState<DietData[]>([]);
  //const [isLoading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState<string>('all');

  useEffect(() => {
    fetch('http://localhost:5000/species',{
        method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecieList(data);
        //setLoading(false);
      });
    
    fetch('http://localhost:5000/diets',{
        method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setDietList(data);
      });
  }, []);
  
  if (!specieList.length) return <p className="text-center">Não há animais visíveis para seu usuário</p>;
  if (!dietList.length) return <p className="text-center">Não há especies de animais visíveis para seu usuário</p>;
  const filterSpecies = (diet: string) => {
    setSelectedDiet(diet);
  };

  const filteredSpecies = selectedDiet === 'all'
    ? specieList
    : specieList.filter(specie => specie.diet === selectedDiet);
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <p className="text-center">Filtrar busca de Espécie com base em Dieta</p>
      <div id="filters" className="mb-4 flex items-center">
        <button onClick={() => filterSpecies('all')} className="bg-gray-600 text-white py-2 px-4 m-2 rounded-lg hover:bg-gray-800">Todos</button>
        {dietList.map((diet:Diet) => (
          <button 
            key={diet._id} 
            onClick={() => filterSpecies(diet.type)} 
            className="bg-gray-600 text-white py-2 px-4 m-2 rounded-lg hover:bg-gray-800">
            {diet.type}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        {filteredSpecies.map(({ _id, name, qtd, habitat, diet}) => (
          <div key={_id} className="bg-white border border-gray-300 rounded p-4 shadow-md">
            <p className="text-xl font-semibold mb-2">{name}</p>
            <p className="text-gray-600">Quntidade: {qtd}</p>
            <p className="text-gray-600">Habitate: {habitat}</p>
            <p className="text-gray-600">Dieta: {diet}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListSpecie;
