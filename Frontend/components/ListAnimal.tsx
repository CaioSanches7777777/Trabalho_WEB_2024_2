'use client';

import React, {useContext, useEffect, useState} from 'react';
import { AnimalContext, Animal } from "@/context/AnimalContext";
import Select from 'react-dropdown-select';
import { Specie } from '@/context/SpecieContext';

const ListAnimal = ({}) => {
  const [animalList, setAnimalList] = useState<Animal[]>([]);
  const [specieList, setSpecieList] = useState<Specie[]>([]);
  //const [isLoading, setLoading] = useState(true);
  const [selectedSpecie, setSelectedSpecie] = useState<string>('all');

  useEffect(() => {
    fetch('http://localhost:5000/animals',{
        method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimalList(data);
        //setLoading(false);
      });
    
    fetch('http://localhost:5000/species',{
        method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecieList(data);
      });
  }, []);
  
  if (!animalList.length) return <p className="text-center">Não há animais visíveis para seu usuário</p>;
  if (!specieList.length) return <p className="text-center">Não há spécies de animais visíveis para seu usuário</p>;
  const filterAnimals = (specie: string) => {
    setSelectedSpecie(specie);
  };

  const filteredAnimals = selectedSpecie === 'all'
    ? animalList
    : animalList.filter(animal => animal.specie === selectedSpecie);
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div id="filters" className="mb-4">
      <p className="text-center">Filtrar busca de Animal com base em Espécie</p>
        <button onClick={() => filterAnimals('all')} className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700">Todos</button>
        {specieList.map((specie:Specie) => (
          <button 
            key={specie._id} 
            onClick={() => filterAnimals(specie.name)} 
            className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700">
            {specie.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        {filteredAnimals.map(({ _id, name, specie, age }) => (
          <div key={_id} className="bg-white border border-gray-300 rounded p-4 shadow-md">
            <p className="text-xl font-semibold mb-2">{name}</p>
            <p className="text-gray-600">Specie: {specie}</p>
            <p className="text-gray-600">Idade: {age}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListAnimal;