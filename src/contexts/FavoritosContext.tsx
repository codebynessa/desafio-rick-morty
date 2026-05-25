import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface FavoritosContextData {
  favoritos: number[];
  alternarFavorito: (id: number) => void;
  ehFavorito: (id: number) => boolean;
}

const FavoritosContext = createContext<FavoritosContextData | undefined>(
  undefined
);

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useLocalStorage<number[]>(
    "favoritos-rick-morty",
    []
  );

  function alternarFavorito(id: number) {
    setFavoritos((favoritosAtuais) => {
      if (favoritosAtuais.includes(id)) {
        return favoritosAtuais.filter((favorito) => favorito !== id);
      }

      return [...favoritosAtuais, id];
    });
  }

  function ehFavorito(id: number) {
    return favoritos.includes(id);
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, alternarFavorito, ehFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  if (!contexto) {
    throw new Error("useFavoritos deve ser usado dentro de FavoritosProvider");
  }

  return contexto;
}