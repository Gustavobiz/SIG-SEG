"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DenunciaCard from "@/components/DenunciaCard";
import EstadoSelect from "@/components/selectEstados"; // <-- Importe o componente
import "@/styles/denunciaServidor.css";

interface Denuncia {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  status: string;
}

export default function DenunciaServidor() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [codigoPesquisa, setCodigoPesquisa] = useState("");
  const [denunciaEncontrada, setDenunciaEncontrada] = useState<Denuncia | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/denuncias/todas")
      .then((res) => res.json())
      .then((data: Denuncia[]) => setDenuncias(data))
      .catch((error) => console.error("Erro ao buscar denúncias", error));
  }, []);

  const denunciasFiltradas =
    estadoSelecionado === ""
      ? denuncias
      : denuncias.filter((denuncia) => denuncia.estado === estadoSelecionado);

  const buscarDenunciaPorCodigo = async () => {
    if (!codigoPesquisa) return;

    try {
      const response = await fetch(
        `http://localhost:5000/denuncias/consulta/${codigoPesquisa}`
      );
      const data: Denuncia = await response.json();
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
    <div className="denuncias-container">
      <h1>Gerenciamento de Denúncias</h1>

      {/* Filtro e Pesquisa na mesma linha */}
      <div className="filtro-pesquisa-container">
        {/* Pesquisa por Código */}
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
        {/* Filtro por Estado */}
        <div className="filtro-box">
          <EstadoSelect
            name="estado"
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          />
        </div>
      </div>

      {/* Resultado da pesquisa por código */}
      {denunciaEncontrada ? (
        <DenunciaCard key={denunciaEncontrada.id} {...denunciaEncontrada} />
      ) : (
        codigoPesquisa && <p>Denúncia não encontrada.</p>
      )}

      {/* Lista de Denúncias Filtradas */}
      <section className="lista-denuncias">
        {denunciasFiltradas.length === 0 ? (
          <p>Nenhuma denúncia encontrada.</p>
        ) : (
          denunciasFiltradas.map((denuncia) => (
            <DenunciaCard key={denuncia.id} {...denuncia} />
          ))
        )}
      </section>
    </div>
  );
}
