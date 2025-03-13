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

    //Caso esteja logado vai para as paginas dos servidores
    if (token) {
      if (pageType === "denuncia") {
        router.push("/denunciaServidor");
      } else {
        router.push("/ocorrenciaServidor");
      }
    } else {
      if (pageType === "denuncia") {
        router.push("/denuncia");
      } else {
        router.push("/ocorrencia");
      }
    }
  }, [router, pageType]);

  return <>{children}</>;
}
