"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: {
    nome?: string;
    email: string;
    senha: string;
  }) => Promise<void>;
  showNameField?: boolean;
  redirectText: string;
  redirectLink: string;
  redirectLabel: string;
}

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  showNameField = false,
  redirectText,
  redirectLink,
  redirectLabel,
}: AuthFormProps) {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await onSubmit({ nome, email, senha });
      setSuccess(`${title} realizado com sucesso!`);
      setTimeout(() => router.push(redirectLink), 2000);
    } catch (err) {
      setError(err.message || "Erro ao processar sua solicitação.");
    }
  };

  return <div></div>;
}
