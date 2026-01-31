"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div 
        className="flex items-center"
        style={{ height: "32px" }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Loading...
        </span>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <Image
            src={session.user.image || "/placeholder.svg"}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center px-3 py-1.5 rounded-full transition-colors hover:bg-black/5"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#181818",
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center px-4 py-2 rounded-full transition-colors"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        color: "#FFFFFF",
        background: "#4A4C6C",
      }}
    >
      Sign in with Google
    </button>
  );
}
