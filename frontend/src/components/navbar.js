"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Remove o token e o nível do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("nivel");

    // Recarrega a página para atualizar o estado de login
    router.push("/login"); // Redireciona para a página de login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          SIG-SEG
        </Link>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <Link href="/denuncias">Denúnciar</Link>
          <Link href="/ocorrencias">Ocorrências</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login" id="btn" className="btn-login">
            Login
          </Link>
          <button onClick={handleLogout} className="btn-sair navbar-links ">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
