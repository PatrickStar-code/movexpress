"use server"

import db from "@/lib/db"
import { hashSync } from "bcrypt-ts"
import { TipoUsuario } from "@prisma/client"
import { redirect } from "next/navigation"
import { UsuarioFormData } from "../_components/formRegister"

export default async function register(formData: UsuarioFormData) {
    console.log(formData)
    const { cpf_usuario, email_usuario, nome_usuario, senha_usuario, telefone_usuario } = formData

    const telString = telefone_usuario.replace(/[^0-9]/g, '');
    const cpfString = cpf_usuario.replace(/[^0-9]/g, '');



    const verifyUserExists = await db.usuario.findFirst({
        where: { OR: [{ email_usuario }, { cpf_usuario: cpfString }, { telefone_usuario: telString }] },
    })

    if (verifyUserExists) {
        return 'User with email or phone already exists'
    }

    try {
        const user = await db.usuario.create({
            data: {
                cpf_usuario: cpfString,
                email_usuario,
                nome_usuario,
                senha_usuario: hashSync(senha_usuario, 10),
                telefone_usuario: telString,
                tipo_usuario: TipoUsuario.CLIENTE
            }
        })

        return user
        redirect('/cliente/')
    } catch (error) {
        console.error(error)
        return 'Error creating user'

    }




}