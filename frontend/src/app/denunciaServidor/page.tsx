"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DenunciaCard from "@/components/DenunciaCard";
import EstadoSelect from "@/components/selectEstados";
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
  const [denunciaSelecionada, setDenunciaSelecionada] = useState<string | null>(
    null
  );
  const [denunciaEncontrada, setDenunciaEncontrada] = useState<Denuncia | null>(
    null
  );
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const criarOcorrencia = async (denunciaId: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("🚨 Nenhum token encontrado!");
        alert("Você precisa estar logado para aprovar uma denúncia.");
        return;
      }

      console.log("Enviando requisição para criar ocorrência...");
      console.log("Denúncia ID:", denunciaId);
      console.log(" oken enviado:", token);

      const response = await fetch("http://localhost:5000/ocorrencias/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ denunciaId }),
      });

      const data = await response.json();

      console.log(" Resposta da API:", data);

      if (!response.ok) {
        console.error("Erro ao criar ocorrência:", data);
        alert(`Erro ao criar ocorrência: ${data.error || "Erro desconhecido"}`);
        return;
      }

      alert(`Ocorrência criada com sucesso!`);
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao criar ocorrência.");
    } finally {
      setIsLoading(false);
    }
  };

  const buscarDenunciaPorCodigo = async () => {
    if (!codigoPesquisa) {
      alert("Digite um código para pesquisar.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/denuncias/consulta/${codigoPesquisa}`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data: Denuncia = await response.json();
      setDenunciaEncontrada(data);
    } catch (error) {
      console.error(" Erro ao buscar denúncia:", error);
      setDenunciaEncontrada(null);
      alert("Denúncia não encontrada.");
    }
  };

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

  const handleAprovarDenuncia = async () => {
    if (!denunciaSelecionada) {
      alert("Selecione uma denúncia para aprovar.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/denuncias/status/${denunciaSelecionada}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "em análise" }),
        }
      );

      if (response.ok) {
        alert("Denúncia aprovada e agora está 'em análise'!");
        window.location.reload();
      } else {
        alert("Erro ao aprovar denúncia.");
      }
    } catch (error) {
      console.error("Erro ao aprovar denúncia:", error);
    }
  };

  return (
    <div className="denuncias-container">
      <h1>Gerenciamento de Denúncias</h1>

      {/* Filtro e Pesquisa na mesma linha */}
      <div className="filtro-pesquisa-container">
        <div className="pesquisa-box">
          <input
            type="text"
            placeholder="Digite o código da denúncia"
            value={codigoPesquisa}
            onChange={(e) => setCodigoPesquisa(e.target.value)}
          />
          <button
            className="submit-btn"
            onClick={() => buscarDenunciaPorCodigo()}
          >
            Buscar
          </button>
        </div>
        <div className="custom-select">
          <EstadoSelect
            name="estado"
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de Denúncias */}
      {/* Lista de Denúncias */}
      <section className="lista-denuncias">
        {denunciasFiltradas.length === 0 ? (
          <p>Nenhuma denúncia encontrada.</p>
        ) : (
          denunciasFiltradas.map((denuncia) => (
            <div key={denuncia.id}>
              <DenunciaCard {...denuncia} />

              {/* Botão para Aprovar Denúncia */}
              <button
                className="btn-aprovar"
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o clique no botão ative o clique do div pai
                  criarOcorrencia(denuncia.id);
                }}
                disabled={isLoading} // Desativa o botão enquanto a requisição está em andamento
              >
                {isLoading ? "Aprovando..." : "Aprovar denúncia"}
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
