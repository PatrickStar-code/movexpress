import { redirect } from "next/navigation";
import FormRegister from "../_components/formRegister";
import { auth } from "@/auth";

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/cliente");
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <FormRegister />
      </div>
    </div>
  );
}
