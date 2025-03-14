import React from "react";

const estadosNordeste = [
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "SE", nome: "Sergipe" },
];

interface EstadoSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EstadoSelect: React.FC<EstadoSelectProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <select
      className="custom-select"
      name={name}
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Selecione um Estado</option>
      {estadosNordeste.map((estado) => (
        <option key={estado.sigla} value={estado.sigla}>
          {estado.nome}
        </option>
      ))}
    </select>
  );
};

export default EstadoSelect;
