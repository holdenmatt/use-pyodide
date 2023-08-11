import { Pyodide } from "./pyodide-api";

import { useAsync } from "react-async-hook";
import { getPyodide } from "./initializePyodide";

/**
 * React hook to access the global pyodide object, after loading finishes.
 */
export const usePyodide = (): {
  pyodide: Pyodide | undefined;
  loading: boolean;
  error: Error | undefined;
} => {
  const {
    result: pyodide,
    loading,
    error,
  } = useAsync(async () => {
    const pyodide = await getPyodide();
    return pyodide;
  }, []);

  return { pyodide, loading, error };
};
