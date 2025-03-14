"use client";

import { useState } from "react";
import EstadoSelect from "@/components/selectEstados";
import "@/styles/denunciaForm.css";

export default function DenunciaForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    cidade: "",
    estado: "",
    localizacao: "",
  });

  // Estado para armazenar o código gerado
  const [codigoGerado, setCodigoGerado] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/denuncias/nova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setCodigoGerado(data.codigo);
        alert(`Denúncia registrada com sucesso!\nCódigo: ${data.codigo}`);
        setFormData({
          titulo: "",
          descricao: "",
          cidade: "",
          estado: "",
          localizacao: "",
        });
      } else {
        alert("Erro ao registrar denúncia.");
      }
    } catch (error) {
      console.error("Erro ao enviar denúncia:", error);
    }
  };

  return (
    <div className="denuncia-container">
      <div className="denuncia-box">
        <div className="header">
          <img src="/images/camera de segurança.jpg" alt="camera" />
          <h2>Denuncie aqui</h2>
        </div>

        <form onSubmit={handleSubmit} className="denuncia-form">
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="localizacao"
            placeholder="Localização"
            value={formData.localizacao}
            onChange={handleChange}
            required
          />

          {/* Componente de Select para Estados */}
          <EstadoSelect
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Registrar Denúncia
          </button>
        </form>

        {/* Exibe o código gerado se existir */}
        {codigoGerado && (
          <div className="codigo-gerado">
            <p>Seu código de denúncia:</p>
            <strong>{codigoGerado}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
