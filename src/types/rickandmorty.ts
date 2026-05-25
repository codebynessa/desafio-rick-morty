export type FiltroStatus = "all" | "alive" | "dead" | "unknown";

export interface Personagem {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
}

export interface InfoAPI {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RespostaAPI {
  info: InfoAPI;
  results: Personagem[];
}