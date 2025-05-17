"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";

export default function VerifyPage({ token }: { token: string }) {
  const [msg, setMsg] = useState<string>("");

  const onVerify = async () => {
    try {
      setMsg("Waiting...");

      console.log(token);
      
      const { data } = await axios.patch(
        "/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data.message);
      setMsg(data.message);

    } catch (err: any) {
      console.error(err);
      setMsg("Verification failed."); // Tambahkan fallback message jika gagal
    }
  };

  useEffect(() => {
    onVerify();
  }, [])

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <h1 className="text-6xl text-orange-500">{msg}</h1>
    </div>
  );


}
