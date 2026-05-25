import { useEffect, useMemo, useState } from "react";
import "./App.css";

import BarraBusca from "./components/BarraBusca";
import BotoesStatus from "./components/BotoesStatus";
import CartaoPersonagem from "./components/CartaoPersonagem";
import Paginacao from "./components/Paginacao";

import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";
import { useFavoritos } from "./contexts/FavoritosContext";

import type {
  FiltroStatus,
  Personagem,
  RespostaAPI,
} from "./types/rickandmorty";

export default function App() {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("all");

  const buscaDebounce = useDebounce(busca, 400);
  const { favoritos } = useFavoritos();

  const url = useMemo(() => {
    const parametros = new URLSearchParams();

    parametros.append("page", String(pagina));

    if (filtroStatus !== "all") {
      parametros.append("status", filtroStatus);
    }

    return `https://rickandmortyapi.com/api/character?${parametros.toString()}`;
  }, [pagina, filtroStatus]);

  const { dados, loading, erro } = useFetch<RespostaAPI>(url);

  useEffect(() => {
    setPagina(1);
  }, [filtroStatus]);

  const personagensFiltrados: Personagem[] =
    dados?.results.filter((personagem) =>
      personagem.name.toLowerCase().includes(buscaDebounce.toLowerCase())
    ) ?? [];

  return (
    <main className="app">
      <section className="painel">
        <header className="cabecalho">
          <div>
            <h1>🧬 Painel de Personagens</h1>
            <p>Rick and Morty API · useFetch + useDebounce + Context</p>
          </div>

          <div className="contador-favoritos">
            ❤️ {favoritos.length} favoritos
          </div>
        </header>

        <section className="controles">
          <BarraBusca busca={busca} onBuscaChange={setBusca} />

          <BotoesStatus
            filtroStatus={filtroStatus}
            onFiltroChange={setFiltroStatus}
          />
        </section>

        {loading && <p className="mensagem">Carregando personagens...</p>}

        {erro && <p className="mensagem erro">{erro}</p>}

        {!loading && !erro && personagensFiltrados.length === 0 && (
          <p className="mensagem">Nenhum personagem encontrado.</p>
        )}

        {!loading && !erro && personagensFiltrados.length > 0 && (
          <section className="grade-personagens">
            {personagensFiltrados.map((personagem) => (
              <CartaoPersonagem
                key={personagem.id}
                personagem={personagem}
              />
            ))}
          </section>
        )}

        {dados && (
          <>
            <div className="linha"></div>

            <footer className="rodape">
              <span>
                {dados.info.count} personagens · Página {pagina} de{" "}
                {dados.info.pages}
              </span>

              <Paginacao
                pagina={pagina}
                totalPaginas={dados.info.pages}
                onPaginaChange={setPagina}
              />
            </footer>
          </>
        )}
      </section>
    </main>
  );
}