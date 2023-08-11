# use-pyodide

A simple React hook to run Python (using pyodide) in a web worker.

## Install

```
npm install use-pyodide
```

## usePyodide

To initialize pyodide and use it in a React component,
just call the `usePyodide` hook:

```
import { usePyodide } from "use-pyodide";

const MyComponent = () => {
    const { loading, pyodide } = usePyodide();

    if (pyodide) {
        // Do something
    }
    ...
}
```

## Runs in a web worker

To avoid blocking the main UI thread, we run pyodide in a background web worker,
as described here:

https://pyodide.org/en/stable/usage/webworker.html

## Quickstart

Install with:

```
npm install pyodide-worker
```

Then wrap your app in a provider that will make pyodide accessible to child components:

```
import { PyodideProvider } from "pyodide-worker";

const pythonPackages = ["sqlfluff==2.0.5"];

export default function App() {
    return (
        <PyodideProvider packages={pythonPackages}>
            {... your app ...}
        </PyodideProvider>
    )
}
```

Within a React component, you can now access pyodide with the `usePyodide` hook:

```
const { pyodide, loading } = usePyodide();
```

You can also access pyodide in non-React contexts like this:

```
const pyodide = await getPyodide();
```

## Executing python

You can then run Python code in your browser, and optionally pass in global vars
to the Python execution namespace.

```
const pythonCode = "...";

const result = await pyodide.runPython(pythonCode, {
    args: {
        name: "Matt"
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
const jsonObject = await pyodide.runPythonJson(code, vars);
```

## SSR

If you're using a framework such as Next.js that supports server-side rendering (SSR),
you will likely want to use dynamic loading to load pyodide only in the browser:

```
const PyodideProvider = dynamic(
    () => import("pyodide-worker").then((mod) => mod.PyodideProvider),
    {
        ssr: false,
    }
);
```

## Importing Typescript

Instead of compiling to JS, this library is intended to be imported from another Typescript project.

If you're using NextJS, you should modify your `next.config.js` file to enable transpiling:

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["pyodide-worker"]
}
```
