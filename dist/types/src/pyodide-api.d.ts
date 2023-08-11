import { JSONValue } from "./types";
export interface Pyodide {
    runPython: (code: string, globals?: Record<string, any>) => Promise<any>;
    runPythonJson: (code: string, globals?: Record<string, any>) => Promise<JSONValue | null>;
    terminate: () => void;
}
/**
 * Initialize pyodide and load some given packages.
 */
export declare const initialize: (packages?: string[]) => Promise<Pyodide>;
/**
 * Run a Python code string, and parse its result as JSON.
 */
export declare const runPythonJson: (code: string, globals?: Record<string, any>) => Promise<JSONValue | null>;
