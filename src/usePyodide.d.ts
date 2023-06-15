/**
 * React hook to get the global pyodide object, after loading finishes.
 */
declare const usePyodide: () => {
    loading: any;
    pyodide: any;
};
export default usePyodide;
