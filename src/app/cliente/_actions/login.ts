"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { TFormDataLogin } from "../_components/formLogin";

export default async function login(formData: TFormDataLogin) {
    const login = formData.login;
    const password = formData.password;

    try {
        await signIn("credentials", {
            login,
            password,
        });
    } catch (e) {
        console.error(e);
        if (e instanceof AuthError && e.type === "CredentialsSignin") {
            throw new Error("Credenciais inválidas");
        }
    }

}