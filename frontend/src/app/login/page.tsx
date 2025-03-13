"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", data.token);

      // Redireciona para o dashboard
      router.push("/denuncias");
    } catch (error) {
      setError("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Imagem lateral */}
        <div className="login-image">
          <img src="/images/camera.jpg" alt="Login Background" />
        </div>

        {/* Formulário de Login */}
        <div className="login-form">
          <h2>Entrar no SIG-SEG</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={senha} // Corrigido para "senha"
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <div className="login-options">
              <label>
                <input type="checkbox" /> Lembre-se de mim
              </label>
              <Link href="#">Esqueceu sua senha?</Link>
            </div>

            <button className="login-button" type="submit">
              Conectar-se
            </button>
          </form>

          <p className="signup-link">
            Você não tem uma conta? <Link href="/cadastrar">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
