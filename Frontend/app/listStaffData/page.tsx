"use client";

import ListUser from "@/components/ListUser";
import LocateProvider, { LocateContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";

const Staff = async ({}) => {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      <LocateProvider><ListUser></ListUser></LocateProvider>
    </main>
  );
};

export default Staff;