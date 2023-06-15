import { createContext } from "react";

import { initialize, Pyodide } from "./pyodide-api";

/**
 * We initialize pyodide as a singleton promise.
 */
let pyodide: Promise<Pyodide> | null = null;

export const PyodideContext = createContext<Promise<Pyodide> | null>(null);

interface Props {
  packages?: string[];
  children: React.ReactNode;
}

/**
 * React provider to initialize pyodide with some given packages.
 */
const PyodideProvider = ({ packages, children }: Props) => {
  if (!pyodide) {
    pyodide = initialize(packages);
  }

  return <PyodideContext.Provider value={pyodide}>{children}</PyodideContext.Provider>;
};

/**
 * `getPyodide` can be used to access pyodide, similar to `usePyodide` but
 * can be used in a non-React context where a hook wont work.
 */
export const getPyodide = (): Promise<Pyodide> => {
  if (pyodide) {
    return pyodide;
  } else {
    throw new Error("Pyodide must be initialized before calling `getPyodide`");
  }
};

export default PyodideProvider;
