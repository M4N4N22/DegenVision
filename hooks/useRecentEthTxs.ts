import { useState, useEffect } from "react";

export function useRecentEthTxs() {
  const [txs, setTxs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTxs() {
      setIsLoading(true);
      setIsError(null);
      try {
        const res = await fetch("/api/nodit/txs");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          setTxs(data.txs || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(error as Error);
          setIsLoading(false);
        }
      }
    }

    fetchTxs();
    const interval = setInterval(fetchTxs, 60000); // refresh every 60 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { txs, isLoading, isError };
}
