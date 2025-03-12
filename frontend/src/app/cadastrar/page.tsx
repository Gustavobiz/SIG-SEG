"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/cadastrar.css";

export default function Cadastrar() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao cadastrar");
        return;
      }

      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setError("Erro no servidor. Tente novamente.");
    }
  };

  return <div></div>;
}
