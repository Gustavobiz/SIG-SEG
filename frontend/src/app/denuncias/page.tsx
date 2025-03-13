"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DenunciaCard from "@/components/DenunciaCard";
import DenunciaForm from "@/components/DenunciaForm";
import "@/styles/denuncias.css"; // Certifique-se de criar esse arquivo!

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
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [codigoPesquisa, setCodigoPesquisa] = useState("");
  const [denunciaEncontrada, setDenunciaEncontrada] = useState<Denuncia | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nivelUsuario, setNivelUsuario] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userLevel = localStorage.getItem("nivel") || "publico";
      setNivelUsuario(userLevel);

      if (userLevel === "servidor") {
        fetch("http://localhost:5000/denuncias/todas")
          .then((res) => res.json())
          .then((data: Denuncia[]) => setDenuncias(data))
          .catch((error) => console.error("Erro ao buscar denúncias", error));
      }
    }
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
      {isLoggedIn && nivelUsuario === "servidor" ? (
        <>
          {/* Filtro por Estado */}
          <label htmlFor="estado">Filtrar por Estado:</label>
          <select
            id="estado"
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
          </select>

          {/* Lista de denúncias */}
          <section className="lista-denuncias">
            {denunciasFiltradas.length === 0 ? (
              <p>Nenhuma denúncia encontrada.</p>
            ) : (
              denunciasFiltradas.map((denuncia) => (
                <DenunciaCard key={denuncia.id} {...denuncia} />
              ))
            )}
          </section>
        </>
      ) : (
        <>
          {/* Formulário de Nova Denúncia */}
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
              <button
                className="btn-detalhes"
                onClick={buscarDenunciaPorCodigo}
              >
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
        </>
      )}
    </div>
  );
}
