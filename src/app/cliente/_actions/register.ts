"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { TipoUsuario } from "@prisma/client";
import { redirect } from "next/navigation";
import { UsuarioFormData } from "../_components/formRegister";

export default async function registerUser(formData: UsuarioFormData) {
    console.log("Recebendo dados do formulário:", formData);

    const { cpf_usuario, email_usuario, nome_usuario, senha_usuario, telefone_usuario } = formData;

    const telString = telefone_usuario.replace(/\D/g, "");
    const cpfString = cpf_usuario.replace(/\D/g, "");

    // Verificar se já existe um usuário com o mesmo e-mail, CPF ou telefone
    const verifyUserExists = await db.usuario.findFirst({
        where: {
            OR: [
                { email: email_usuario },
                { cpf: cpfString },
                { telefone: telString }
            ],
        },
    });

    if (verifyUserExists) {
        return { error: "Usuário com este e-mail, CPF ou telefone já existe" };
    }

    try {
        const user = await db.usuario.create({
            data: {
                cpf: cpfString,
                email: email_usuario,
                nome: nome_usuario,
                senha: hashSync(senha_usuario, 10),
                telefone: telString,
                tipo_usuario: TipoUsuario.CLIENTE,
            },
        });

        console.log("Usuário criado com sucesso:", user);

        // Redireciona para a página de cliente após o cadastro
        redirect("/cliente/");
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return { error: "Erro ao criar usuário. Tente novamente." };
    }
}
