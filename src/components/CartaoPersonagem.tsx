import { useFavoritos } from "../contexts/FavoritosContext";
import type { Personagem } from "../types/rickandmorty";

interface CartaoPersonagemProps {
  personagem: Personagem;
}

export default function CartaoPersonagem({
  personagem,
}: CartaoPersonagemProps) {
  const { alternarFavorito, ehFavorito } = useFavoritos();

  const favorito = ehFavorito(personagem.id);

  function classeStatus() {
    if (personagem.status === "Alive") return "alive";
    if (personagem.status === "Dead") return "dead";
    return "unknown";
  }

  return (
    <article className={`card-personagem ${favorito ? "favorito" : ""}`}>
      <button
        className="botao-favorito"
        onClick={() => alternarFavorito(personagem.id)}
        title="Favoritar personagem"
      >
        {favorito ? "❤️" : "🤍"}
      </button>

      <img src={personagem.image} alt={personagem.name} />

      <div className="conteudo-card">
        <h3>{personagem.name}</h3>
        <p>{personagem.species}</p>

        <span className={`status ${classeStatus()}`}>
          {personagem.status}
        </span>
      </div>
    </article>
  );
}