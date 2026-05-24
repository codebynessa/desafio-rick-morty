import type { Personagem } from "../types/rickandmorty";

interface Props {
  personagem: Personagem;
  onClick: (id: number) => void;
}

export default function CartaoPersonagem({ personagem, onClick }: Props) {
  return (
    <div className="card" onClick={() => onClick(personagem.id)}>
      <img src={personagem.image} alt={personagem.name} />

      <div className="card-info">
        <h3>{personagem.name}</h3>
        <p>{personagem.species}</p>

        <span className={`badge ${personagem.status.toLowerCase()}`}>
          {personagem.status}
        </span>
      </div>
    </div>
  );
}