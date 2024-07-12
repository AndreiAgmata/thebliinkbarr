import React from "react";
import Image from "next/image";
import LoginForm from "@/components/Auth/LoginForm";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/AuthOptions";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await getServerSession(nextAuthOptions);
  if (session) redirect("/");
  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 h-full flex flex-col items-center justify-center relative">
        <LoginForm />
      </div>
      <div
        className="col-span-1 h-full hidden lg:flex items-center justify-center"
        style={{
          backgroundImage: "url('/PageAssets/authBg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mascot-wrapper relative w-96 h-96">
          <Image
            src={
              "https://res.cloudinary.com/dko71zmmd/image/upload/f_auto,q_auto/kmghxj8oxd25pkc1kbin"
            }
            alt="mascot"
            className="object-contain drop-shadow-lg"
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
