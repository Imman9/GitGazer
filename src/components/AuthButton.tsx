"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Sign Out ({session.user?.name})
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="bg-black text-white px-4 py-2 rounded-md"
    >
      Sign in with GitHub
    </button>
  );
}
