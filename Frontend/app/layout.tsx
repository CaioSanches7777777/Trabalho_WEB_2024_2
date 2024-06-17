import AuthProvider from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RegisterProvider from "@/context/RegisterContext";
import { AnimalContextProvider } from "@/context/AnimalContext";
import { DietContextProvider } from "@/context/DietContext";
import { HabitatContextProvider } from "@/context/HabitatContext";
import { SpecieContextProvider } from "@/context/SpecieContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My first Next SPA",
  description: " My Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_br">

      <body className={`bg-slate-100 ${inter.className}`}>
        <AnimalContextProvider>
          <SpecieContextProvider>
            <DietContextProvider>
              <HabitatContextProvider>
                <RegisterProvider>
                  <AuthProvider>
                    {children}
                  </AuthProvider>
                </RegisterProvider>
              </HabitatContextProvider>
            </DietContextProvider>
          </SpecieContextProvider>
        </AnimalContextProvider>
      </body>
    </html>
  );
}
