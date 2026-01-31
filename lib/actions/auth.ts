"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutUser() {
  await signOut();
  redirect("/");
}
