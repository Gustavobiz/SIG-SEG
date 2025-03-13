"use client";

import "@/styles/denuncias.css";
import { useEffect, useState } from "react";
import DenunciaCard from "@/components/DenunciaCard";

interface Denuncia {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  status: string;
}

export default function Denuncias() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/denuncias/todas")
      .then((res) => res.json())
      .then((data) => setDenuncias(data))
      .catch((error) => console.error("Erro ao buscar denúncias", error));
  }, []);

  return (
    <div className="denuncias-container">
      {/* Seção de Destaque */}
      <section className="destaque">
        <h1>Denúncias Registradas</h1>
        <p>Veja as denúncias registradas na sua região.</p>
        <button className="btn-registrar">Registrar Nova Denúncia</button>
      </section>

      {/* Lista de Denúncias */}
      <section className="lista-denuncias">
        {denuncias.length === 0 ? (
          <p>Nenhuma denúncia encontrada.</p>
        ) : (
          denuncias.map((denuncia) => (
            <DenunciaCard key={denuncia.id} {...denuncia} />
          ))
        )}
      </section>
    </div>
  );
}
