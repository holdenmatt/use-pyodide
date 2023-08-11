import { PyodideInterface } from "pyodide";
declare global {
    interface Window {
        pyodide: PyodideInterface;
    }
}
export interface PyodideRunner {
    initialize: (packages?: string[]) => Promise<void>;
    runPython: (code: string, globals?: Record<string, any>) => Promise<any>;
    version: string;
}
