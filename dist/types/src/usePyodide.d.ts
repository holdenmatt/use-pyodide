import { Pyodide } from "./pyodide-api";
/**
 * React hook to access the global pyodide object, after loading finishes.
 */
export declare const usePyodide: () => {
    pyodide: Pyodide | undefined;
    loading: boolean;
    error: Error | undefined;
};
