"use client";

import Link from "next/link";
import { useState } from "react";
import "@/styles/login.css"; // Importando estilos

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Imagem lateral */}
        <div className="login-image">
          <img src="/images/login-bg.jpg" alt="Login Background" />
        </div>

        {/* Formulário de Login */}
        <div className="login-form">
          <h2>Entrar no SIG-SEG</h2>

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-options">
            <label>
              <input type="checkbox" /> Lembre-se de mim
            </label>
            <Link href="#">Esqueceu sua senha?</Link>
          </div>

          <button className="login-button">Conectar-se</button>

          <p className="signup-link">
            Você não tem uma conta? <Link href="#">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
