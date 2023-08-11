import { Pyodide } from "./pyodide-api";
/**
 * React hook to get the global pyodide object, after loading finishes.
 */
declare const usePyodide: () => {
    loading: boolean;
    pyodide: Pyodide | undefined;
};
export default usePyodide;
