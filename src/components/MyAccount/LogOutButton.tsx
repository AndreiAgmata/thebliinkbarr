"use client";
import { signOut } from "next-auth/react";
import React from "react";

function LogOutButton() {
  return (
    <div className="option ps-4 py-2 hover:bg-neutral-100">
      <p className="font-medium cursor-pointer" onClick={() => signOut()}>
        Log Out
      </p>
    </div>
  );
}

export default LogOutButton;
