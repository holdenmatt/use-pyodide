/**
 * Use a Web Worker to initialize and run pyodide code
 * without blocking the main thread.
 */
import { JSONValue } from "@holdenmatt/ts-utils";
import { PyodideInterface } from "pyodide";
declare global {
    interface Window {
        pyodide: PyodideInterface;
    }
}
export interface PyodideRunner {
    initialize: (packages?: string[]) => Promise<void>;
    runPython: (code: string, globals?: Record<string, JSONValue>) => Promise<unknown>;
    version: string;
}
