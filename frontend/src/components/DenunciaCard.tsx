"use client";

import "@/styles/denunciaCard.css";
import Link from "next/link";

interface DenunciaProps {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  status: string;
}

export default function DenunciaCard({
  id,
  titulo,
  descricao,
  cidade,
  estado,
  status,
}: DenunciaProps) {
  return (
    <div className="denuncia-card">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <span>
        📍 {cidade} - {estado}
      </span>
      <span className={`status ${status.toLowerCase()}`}>{status}</span>
    </div>
  );
}
