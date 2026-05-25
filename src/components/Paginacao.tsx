interface PaginacaoProps {
  pagina: number;
  totalPaginas: number;
  onPaginaChange: (pagina: number) => void;
}

export default function Paginacao({
  pagina,
  totalPaginas,
  onPaginaChange,
}: PaginacaoProps) {
  return (
    <div className="paginacao">
      <button
        disabled={pagina === 1}
        onClick={() => onPaginaChange(pagina - 1)}
      >
        ← Anterior
      </button>

      <span>
        Página {pagina} de {totalPaginas}
      </span>

      <button
        disabled={pagina === totalPaginas}
        onClick={() => onPaginaChange(pagina + 1)}
      >
        Próxima →
      </button>
    </div>
  );
}