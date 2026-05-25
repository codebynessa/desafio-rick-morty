import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function buscarDados() {
      try {
        setLoading(true);
        setErro("");

        const resposta = await fetch(url, {
          signal: controller.signal,
        });

        if (!resposta.ok) {
          throw new Error("Erro ao buscar dados da API");
        }

        const json = await resposta.json();
        setDados(json);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setErro(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    buscarDados();

    return () => controller.abort();
  }, [url]);

  return { dados, loading, erro };
}