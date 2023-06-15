/**
 * Expose a pyodide API in the main thread, which executes
 * code in a web worker (via comlink).
 */
import * as Comlink from "comlink";

import { PyodideRunner } from "./pyodide-worker";
import { JSONValue } from "./types";

let _worker: Worker | null = null;
let _runner: Comlink.Remote<PyodideRunner> | null = null;

export interface Pyodide {
  runPython: (code: string, globals?: Record<string, any>) => Promise<any>;
  runPythonJson: (
    code: string,
    globals?: Record<string, any>
  ) => Promise<JSONValue | null>;
  terminate: () => void;
}

/**
 * Initialize pyodide and load some given packages.
 */
export const initialize = async (packages?: string[]): Promise<Pyodide> => {
  if (!_worker) {
    _worker = new Worker(new URL("./pyodide-worker", import.meta.url));
    _runner = Comlink.wrap(_worker);
    await _runner.initialize(packages);
  }

  return {
    runPython,
    runPythonJson,
    terminate,
  };
};

/**
 * Terminate the worker.
 */
const terminate = () => {
  _worker?.terminate();
  _worker = null;

  _runner?.[Comlink.releaseProxy]();
  _runner = null;
};

/**
 * Run a Python code string and return the value of the last statement.
 */
const runPython = async (code: string, globals?: Record<string, any>): Promise<any> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  const value = await _runner.runPython(code, globals);
  return value;
};

/**
 * Run a Python code string, and parse its result as JSON.
 */
export const runPythonJson = async (
  code: string,
  globals?: Record<string, any>
): Promise<JSONValue | null> => {
  const result = (await runPython(code, globals)) as string;
  if (result) {
    const json = JSON.parse(result) as JSONValue;
    return json;
  }

  return null;
};