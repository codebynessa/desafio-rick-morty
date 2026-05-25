import type { FiltroStatus } from "../types/rickandmorty";

interface BotoesStatusProps {
  filtroStatus: FiltroStatus;
  onFiltroChange: (filtro: FiltroStatus) => void;
}

const filtros: { label: string; valor: FiltroStatus }[] = [
  { label: "Todos", valor: "all" },
  { label: "Alive", valor: "alive" },
  { label: "Dead", valor: "dead" },
  { label: "Unknown", valor: "unknown" },
];

export default function BotoesStatus({
  filtroStatus,
  onFiltroChange,
}: BotoesStatusProps) {
  return (
    <div className="botoes-status">
      {filtros.map((filtro) => (
        <button
          key={filtro.valor}
          className={filtroStatus === filtro.valor ? "ativo" : ""}
          onClick={() => onFiltroChange(filtro.valor)}
        >
          {filtro.label}
        </button>
      ))}
    </div>
  );
}