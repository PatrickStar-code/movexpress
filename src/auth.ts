import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [Credentials],

    session: {
        strategy: "jwt", // "jwt" mantém a sessão no token
        maxAge: 24 * 60 * 60, // 24 horas em segundos
        updateAge: 24 * 60 * 60, // Atualiza o token a cada 24 horas
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/",
        signOut: "/logout",
    },
    secret: process.env.NEXTAUTH_SECRET,
});