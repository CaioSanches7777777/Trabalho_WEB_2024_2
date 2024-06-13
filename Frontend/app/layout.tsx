import AuthProvider from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <AuthProvider>
          {children}
        </AuthProvider>
        
      </body>
    </html>
  );
}