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

// ✅ Ubah function jadi async
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await auth(); // Ambil data user dari server

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <Navbar user={data?.user} />
          {children}
        </SessionProvider>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          draggable
          theme="dark"
          closeOnClick
          transition={Bounce}
        />
      </body>
    </html>
  );
}
