import { logElapsedTime } from "@holdenmatt/ts-utils";

export let DEBUG: boolean | undefined;
import { initializeWorker, Pyodide } from "./pyodide-api";

let pyodide: Promise<Pyodide> | undefined;

/**
 * Initialize Pyodide, ensuring we only initialize it once.
 *
 * @param debug If true, log debug messages and elapsed times to the console.
 * @param packages Additional python package names to load.
 */
export async function initializePyodide(options?: {
  debug: boolean;
  packages?: string[];
}): Promise<Pyodide> {
  const { debug = false, packages } = options || {};
  DEBUG = debug;

  if (pyodide === undefined) {
    pyodide = _initializePyodide(packages);
  }
  return pyodide;
}

/**
 * Initialize Pyodide, and load any given packages.
 */
const _initializePyodide = async (packages?: string[]): Promise<Pyodide> => {
  const start = performance.now();

  pyodide = initializeWorker(packages);

  DEBUG && logElapsedTime("Pyodide initialized", start);
  return pyodide;
};

/**
 * Get the pyodide instance, initializing it if needed.
 *
 * Typically `usePyodide` is used in React components instead, but this
 * method provides access outside of React contexts.
 */
export const getPyodide = async (): Promise<Pyodide> => {
  if (pyodide) {
    return pyodide;
  } else {
    return await initializePyodide();
  }
};
