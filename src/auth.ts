import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                login: { label: "Login", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.login || !credentials?.password) {
                    throw new Error("Login e senha são obrigatórios.");
                }

                const user = await prisma.usuario.findFirst({
                    where: {
                        login: credentials.login,
                    },
                });

                if (!user) {
                    return null
                }

                // Verificar a senha 
                const isPasswordCorrect = compareSync(
                    credentials.password as string,
                    user.senha ?? ""
                );


                if (!isPasswordCorrect) {
                    return null;
                }

                // Definir o tipo de usuário
                const tipoUsuario = user.tipo_usuario;

                // Obter a URL atual
                const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

                // Bloquear login se o tipo de usuário não for compatível com a página acessada
                if (currentPath.includes("/entregador") && tipoUsuario !== "ENTREGADOR") {
                    throw new Error("Acesso negado: apenas entregadores podem acessar esta página.");
                }
                if (currentPath.includes("/cliente") && tipoUsuario !== "CLIENTE") {
                    throw new Error("Acesso negado: apenas clientes podem acessar esta página.");
                }
                if (currentPath.includes("/admin") && tipoUsuario !== "ADMIN") {
                    throw new Error("Acesso negado: apenas administradores podem acessar esta página.");
                }

                return {
                    id: user.id.toString(),
                    nome: user.nome,
                    email: user.email,
                    tipo_usuario: user.tipo_usuario,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.name = user.name as string;
                token.email = user.email as string;
                token.tipo_usuario = user.tipo_usuario as string;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.tipo_usuario = token.tipo_usuario as string;

            return session;
        },
    },
    pages: {
        signOut: "/logout",
    },
    secret: process.env.NEXTAUTH_SECRET,
});
