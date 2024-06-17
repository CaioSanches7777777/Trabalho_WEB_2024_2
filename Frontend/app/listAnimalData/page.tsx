"use client";

import ListAnimal from "@/components/ListAnimal";
import ListDiet from "@/components/ListDiet";
import ListHabitat from "@/components/ListHabitat";
import ListSpecie from "@/components/ListSpecie";
import { AnimalData, AnimalContextProvider } from "@/context/AnimalContext";
import { DietContextProvider } from "@/context/DietContext";
import { HabitatContextProvider } from "@/context/HabitatContext";
import { SpecieContextProvider } from "@/context/SpecieContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";

const Animals = async ({}) => {
  
    const router = useRouter();
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      <HabitatContextProvider>
        <ListHabitat></ListHabitat>
      </HabitatContextProvider>
      <DietContextProvider>
        <ListDiet></ListDiet>
      </DietContextProvider>
      <AnimalContextProvider>
        <ListAnimal></ListAnimal>
      </AnimalContextProvider>
      <SpecieContextProvider>
        <ListSpecie></ListSpecie>
      </SpecieContextProvider>
    </main>
  );
};

export default Animals;