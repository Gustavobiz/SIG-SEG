"use client";

import Link from "next/link";
import { useState } from "react";
import "./Navbar.css"; // Importamos os estilos da Navbar

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/login" className="btn-login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
