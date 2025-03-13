"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectUser({
  children,
  pageType, // Define se a página é de denúncias ou ocorrências
}: {
  children: React.ReactNode;
  pageType: "denuncia" | "ocorrencia";
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nivelUsuario = localStorage.getItem("nivel");

    if (!token) {
      if (pageType === "denuncia") {
        router.push("/denunciaServidor"); // Servidor -> Página de Denúncias
      } else {
        router.push("/ocorrenciaServidor"); // Servidor -> Página de Ocorrências
      } // Usuário não autenticado vai para o login
    } else if (nivelUsuario === "servidor") {
    } else {
      if (pageType === "denuncia") {
        router.push("/denuncia"); // Público -> Página de Denúncias
      } else {
        router.push("/ocorrencia"); // Público -> Página de Ocorrências
      }
    }
  }, [router, pageType]);

  return <>{children}</>;
}
