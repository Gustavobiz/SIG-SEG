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
    setError("");
    setSuccess("");

    console.log("Enviando para o backend:", {
      nome,
      email,
      senha,
      nivel: "publico",
    });

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha: senha.trim(),
          nivel: "publico",
        }),
      });

      const data = await response.json();

      console.log("🔹 Resposta do backend:", data);

      if (!response.ok) {
        setError(data.error || "Erro ao cadastrar");
        return;
      }

      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      console.error(" Erro na requisição:", error);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-content">
        {/* Imagem lateral */}
        <div className="cadastro-image">
          <img src="/images/camera.jpg" alt="Cadastro Background" />
        </div>

        {/* Formulário de Cadastro */}
        <div className="cadastro-form">
          <h2>Cadastre-se no SIG-SEG</h2>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleCadastro}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button className="cadastro-button" type="submit">
              Cadastrar-se
            </button>
          </form>

          <p className="login-link">
            Já tem uma conta? <Link href="/login">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
