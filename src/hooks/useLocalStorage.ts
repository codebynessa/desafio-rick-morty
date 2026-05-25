import { useEffect, useState } from "react";

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    const salvo = localStorage.getItem(chave);

    if (salvo) {
      return JSON.parse(salvo) as T;
    }

    return valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor));
  }, [chave, valor]);

  return [valor, setValor] as const;
}