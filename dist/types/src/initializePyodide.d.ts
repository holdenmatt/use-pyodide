import { Pyodide } from "./pyodide-api";
/**
 * Initialize Pyodide, ensuring we only initialize it once.
 *
 * @param debug If true, log debug messages and elapsed times to the console.
 * @param packages Additional python package names to load.
 */
export declare function initializePyodide(options?: {
    debug: boolean;
    packages?: string[];
}): Promise<Pyodide>;
/**
 * Get the pyodide instance, initializing it if needed.
 *
 * Typically `usePyodide` is used in React components instead, but this
 * method provides access outside of React contexts.
 */
export declare const getPyodide: () => Promise<Pyodide>;
