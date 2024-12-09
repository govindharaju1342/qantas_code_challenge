import { useState, useEffect } from "react";
import { resetClient } from "../reset-client";

export const useAirportData = (endpoint: string, storageKey: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await resetClient.get(endpoint);
        const worker = new Worker(new URL("../web-worker.ts", import.meta.url));
        worker.onmessage = (e) => {
          setData(e.data);
          setLoading(false);
          localStorage.setItem(storageKey, JSON.stringify(e.data)); // Cache data
        };
        worker.postMessage(response.data);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
        const cachedData = localStorage.getItem(storageKey);
        if (cachedData) {
          setData(JSON.parse(cachedData)); // Use cached data if available
        }
      }
    };

    if (navigator.onLine && !!endpoint && isMounted) {
      fetchData();
    } else {
      const cachedData = !!storageKey ? localStorage.getItem(storageKey) : null;
      if (cachedData) {
        setData(JSON.parse(cachedData)); // Use cached data if available
      } else {
        setError("No network connectivity and no cached data available");
      }
    }
    return () => {
        isMounted = false;
      };
  }, [endpoint, storageKey]);

  return { data, loading, error };
};
