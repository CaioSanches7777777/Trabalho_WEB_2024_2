'use client'

import router from "next/router";
import { useEffect, useState } from "react";

const Staff = async ({}) => {
  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <button className="mt-3 bg-gray-600 text-white p-2 rounded-lg " type="submit" onClick={() => router.push('/home')}>Retornar</button>
      
    </main>
  );
};

export default Staff;