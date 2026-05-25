import { useEffect, useState } from "react";

export function useDebounce<T>(valor: T, delay = 400) {
  const [valorDebounce, setValorDebounce] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDebounce(valor);
    }, delay);

    return () => clearTimeout(timer);
  }, [valor, delay]);

  return valorDebounce;
}