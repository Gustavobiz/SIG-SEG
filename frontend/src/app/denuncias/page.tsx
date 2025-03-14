"use client";

import { useEffect, useState } from "react";
import DenunciaForm from "@/components/DenunciaForm";
import DenunciaCard from "@/components/DenunciaCard";
import RedirectIfLogged from "@/components/RedirectIfLogged";
import "@/styles/denuncias.css";

interface Denuncia {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  status: string;
}

export default function DenunciaPage() {
  const [codigoPesquisa, setCodigoPesquisa] = useState("");
  const [denunciaEncontrada, setDenunciaEncontrada] = useState<Denuncia | null>(
    null
  );

  const buscarDenunciaPorCodigo = async () => {
    if (!codigoPesquisa) return;

    try {
      const response = await fetch(
        `http://localhost:5000/denuncias/consulta/${codigoPesquisa}`
      );
      const data = await response.json();

      if (response.ok) {
        setDenunciaEncontrada(data);
      } else {
        setDenunciaEncontrada(null);
      }
    } catch (error) {
      console.error("Erro ao buscar denúncia:", error);
      setDenunciaEncontrada(null);
    }
  };

  return (
    <RedirectIfLogged to="/denunciaServidor">
      <div className="denuncias-container">
        <DenunciaForm />

        {/* Pesquisa por Código */}
        <div className="pesquisa-container">
          <h2>Pesquisar Denúncia</h2>
          <div className="pesquisa-box">
            <input
              type="text"
              placeholder="Digite o código da denúncia"
              value={codigoPesquisa}
              onChange={(e) => setCodigoPesquisa(e.target.value)}
            />
            <button className="btn-detalhes" onClick={buscarDenunciaPorCodigo}>
              Buscar
            </button>
          </div>
        </div>

        {/* Resultado da busca */}
        {denunciaEncontrada ? (
          <DenunciaCard key={denunciaEncontrada.id} {...denunciaEncontrada} />
        ) : (
          codigoPesquisa && <p>Denúncia não encontrada.</p>
        )}
      </div>
    </RedirectIfLogged>
  );
}
