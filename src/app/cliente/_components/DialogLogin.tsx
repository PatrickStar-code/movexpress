import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import FormLogin from "./formLogin";

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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
