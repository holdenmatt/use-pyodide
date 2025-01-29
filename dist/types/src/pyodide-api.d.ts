import { JSONValue } from "@holdenmatt/ts-utils";
export interface Pyodide {
    runPython: (code: string, globals?: Record<string, JSONValue>) => Promise<unknown>;
    runPythonJson: (code: string, globals?: Record<string, JSONValue>) => Promise<JSONValue | null>;
    setOutput: (callback: ((text: string) => void) | null) => void;
    terminate: () => void;
}
/**
 * Initialize the pyodide worker and load some given packages.
 */
export declare const initializeWorker: (packages?: string[]) => Promise<Pyodide>;
