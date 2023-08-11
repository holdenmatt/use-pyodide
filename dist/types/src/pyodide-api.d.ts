import { JSONValue } from "@holdenmatt/ts-utils";
export interface Pyodide {
    runPython: (code: string, globals?: Record<string, JSONValue>) => Promise<unknown>;
    runPythonJson: (code: string, globals?: Record<string, JSONValue>) => Promise<JSONValue | null>;
    terminate: () => void;
}
/**
 * Initialize pyodide and load some given packages.
 */
export declare const initialize: (packages?: string[]) => Promise<Pyodide>;
/**
 * Run a Python code string, and parse its result as JSON.
 */
export declare const runPythonJson: (code: string, globals?: Record<string, JSONValue>) => Promise<JSONValue | null>;
