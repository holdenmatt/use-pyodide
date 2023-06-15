import { useContext, useEffect, useState } from "react";

import { Pyodide } from "./pyodide-api";
import { PyodideContext } from "./PyodideProvider";

/**
 * React hook to get the global pyodide object, after loading finishes.
 */
const usePyodide = () => {
  const [pyodide, setPyodide] = useState<Pyodide>();
  const [loading, setLoading] = useState(true);

  const context = useContext(PyodideContext);
  if (context === null) {
    throw new Error("usePyodide must be used within a <PyodideProvider>");
  }

  useEffect(() => {
    const waitForLoaded = async () => {
      if (context) {
        setPyodide(await context);
        setLoading(false);
      }
    };
    waitForLoaded();
  }, [context]);

  return { loading, pyodide };
};

export default usePyodide;
