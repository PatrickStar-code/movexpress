import { GET, POST } from "@/auth";
import "next-auth/jwt";

export { GET, POST };

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        tipo_usuario: string;
    }
}

declare module "next-auth" {
    interface User {

        tipo_usuario: string;
    }

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            tipo_usuario: string;
        };
    }
}