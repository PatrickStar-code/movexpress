import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import FormLogin from "./formLogin";
import Link from "next/link";

export default function DialogLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Login
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Digite seu login e senha para acessar sua conta.
          </DialogDescription>
          <FormLogin />
          <p className="text-center text-gray-600 dark:text-gray-400 mt-12">
            Não tem uma conta?{" "}
            <Link
              href="/cliente/cadastro"
              className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-4"
            >
              Crie uma agora
            </Link>
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
