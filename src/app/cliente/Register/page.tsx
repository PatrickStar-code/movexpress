"use client";

import { ToastContainer, Bounce } from "react-toastify";
import FormRegister from "../_components/formRegister";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <FormRegister />
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
    </div>
  );
}
