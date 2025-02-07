"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { TFormDataLogin } from "../_components/formLogin";

export default async function loginUser(formData: TFormDataLogin) {
    const login = formData.login;
    const password = formData.password;

    try {
        await signIn("credentials", {
            login,
            password,
        });
    } catch (e) {
        if (e instanceof AuthError && e.type === "CredentialsSignin") {
            throw new Error("Login ou senha incorretos.");
        }
    }



}