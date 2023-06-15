/**
 * Use a Web Worker to initialize and run pyodide code
 * without blocking the main thread.
 */
import { expose } from "comlink";
import { loadPyodide, PyodideInterface, version } from "pyodide";

const indexURL = `https://cdn.jsdelivr.net/pyodide/v${version}/full/`;

declare global {
  interface Window {
    pyodide: PyodideInterface;
  }
}

//
// Initialize
//

let _pyodideReady: Promise<void> | null = null;

/**
 * Initialize pyodide and set a singleton promise to await it being ready.
 * This should only be called once.
 */
function initialize(
  /**
   * Packages to load via micropip, including official pyodide packages or Python wheels.
   *
   * See:
   * https://pyodide.org/en/stable/usage/loading-packages.html#loading-packages
   */
  packages?: string[]
) {
  if (_pyodideReady !== null) {
    throw new Error("pyodide was already initialized");
  }

  _pyodideReady = _loadPyodide(packages);
  return _pyodideReady;
}

/**
 * Load pyodide with some given packages.
 *
 * Loads all packages with micropip, as recommended here:
 * https://pyodide.org/en/stable/usage/loading-packages.html#how-to-chose-between-micropip-install-and-pyodide-loadpackage
 */
async function _loadPyodide(packages: string[] = []): Promise<void> {
  self.pyodide = await loadPyodide({
    indexURL,
    stdout: (msg: string) => {
      console.log("loadPyodide stdout: ", msg);
    },
    stderr: (msg: string) => {
      console.log("loadPyodide stderr: ", msg);
    },
  });

  if (packages.length > 0) {
    await self.pyodide.loadPackage(["micropip"]);
    const micropip = self.pyodide.pyimport("micropip");
    await micropip.install(packages);
  }
}

//
// Run python code
//

/**
 * Execute a Python code string.
 *
 * Optionally, pass in global vars to the Python execution namespace.
 *
 * If the last statement is an expression (with no semicolon), the returned
 * promise will resolve to the value of this expression.
 */
async function runPython(code: string, globals?: Record<string, any>): Promise<any> {
  await _pyodideReady;

  const options = {
    globals: globals ? self.pyodide.toPy(globals) : undefined,
  };

  return await self.pyodide.runPythonAsync(code, options);
}

//
// Expose API
//

export interface PyodideRunner {
  initialize: (packages?: string[]) => Promise<void>;
  runPython: (code: string, globals?: Record<string, any>) => Promise<any>;
  version: string;
}

const pyodide: PyodideRunner = {
  initialize,
  runPython,
  version,
};

expose(pyodide);
