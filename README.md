# use-pyodide

A simple React hook to run Python code (using pyodide) in a web worker.

## Install

```
npm install use-pyodide
```

If you're using NextJS, modify your `next.config.js` file to enable transpiling from Typescript:

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["use-pyodide"]
}
```

(If you'd prefer building some other way,
[let me know](https://twitter.com/holdenmatt/).)

## usePyodide

To initialize pyodide and use it in a React component,
just call the `usePyodide` hook:

```
import { usePyodide } from "use-pyodide";

const MyComponent = () => {
    const { pyodide, loading, error } = usePyodide();

    useEffect(() => {
        if (pyodide) {
            pyodide.runPython(`print("👋 from Python")`)
        }
    }, [pyodide]);

    ...
}
```

The first time `usePyodide` is called, it will download the Pyodide
wasm bundle from JsDelivr and create a web worker to run it.

Multiple calls are fine, only one singleton instance will be created.

## Preloading

Loading pyodide can take several seconds, so you may want to initialize
it when your app first loads, before it's actually needed in components.

You can optionally do that by calling `initializePyodide`, like this:

```
import { initializePyodide } from "use-pyodide";

const MyApp = () => {
    useEffect(() => {
        initializePyodide({ debug: true });
    }, []);
}
```

## Debug logging

If you call `initializePyodide` with `debug: true`, debug messages from
stdout/stderr and elapsed times will be logged to the browser console,
which can be useful during development.

## Loading packages

By default, only the Python standard library is loaded.

To load other packages, just pass an array of package names to `initializePyodide`.

```
initializePyodide({
    packages: ["numpy", "pandas"]
})
```

Many packages have been built for pyodide:
https://pyodide.org/en/stable/usage/packages-in-pyodide.html

In addition to these, pure Python packages typically work.

Packages are installed using `micropip.install`, as described
[here](https://pyodide.org/en/stable/usage/loading-packages.html#loading-packages).

## Executing python

Once you have a `pyodide` object, you can use it to execute Python code
in your browser!

You can optionally pass in global vars to the Python execution namespace.

```
const pythonCode = "...";

const result = await pyodide.runPython(pythonCode, {
    args: {
        name: "Guido"
    }
});
```

You can access these global vars in Python like this:

```
import json

args = args or {}
name = args.get("name")

json.dumps({
    "message": f"Hi, {name}"
})
```

## Using JSON

As a convenience, if your Python script returns a JSON string as its last expression, you can
use `runPythonJson` to automatically JSON.parse the result:

```
const jsonObject = await pyodide.runPythonJson(code, globals);
```

## Runs in a web worker

To avoid blocking the main UI thread, we run pyodide in a background web worker
(using comlink), as described here:

https://pyodide.org/en/stable/usage/webworker.html

## Accessing outside React

If needed, you can access pyodide outside of React components like this:

```
import { getPyodide } from "use-pyodide";

const pyodide: Pyodide = await getPyodide();
```

## License

MIT license.

Feel free to copy/fork code as you like. No need for attribution, but if you
find this library helpful or build something cool with it, [let me know!](https://twitter.com/holdenmatt/)
