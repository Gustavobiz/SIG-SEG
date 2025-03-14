"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RedirectIfLoggedProps {
  children: React.ReactNode;
  to: string; // Página para redirecionar usuários logados
}

export default function RedirectIfLogged({
  children,
  to,
}: RedirectIfLoggedProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (token) {
        router.replace(to); // Redireciona imediatamente se estiver logado
      } else {
        setIsLoading(false); // Permite renderizar a página se não estiver logado
      }
    };

    checkLoginStatus();
  }, [router, to]);

  if (isLoading) {
    return <div className="loading-screen">Verificando acesso...</div>;
  }

  return <>{children}</>;
}
