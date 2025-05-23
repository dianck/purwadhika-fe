import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogger App",
  description: "Blogger Web Application",
};

// ✅ RootLayout tetap async untuk ambil auth session
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // ambil session user

  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-white 
          text-black
        `}
      >
        <SessionProvider session={session}>
          <Navbar user={session?.user} />
          {children}
        </SessionProvider>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          draggable
          closeOnClick
          transition={Bounce}
          theme="light" // ✅ Ganti ke 'light' jika tidak ingin dark mode
        />
      </body>
    </html>
  );
}
