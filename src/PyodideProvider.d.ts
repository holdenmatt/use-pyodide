/// <reference types="react" />
import { Pyodide } from "./pyodide-api";
export declare const PyodideContext: import("react").Context<Promise<Pyodide> | null>;
interface Props {
    packages?: string[];
    children: React.ReactNode;
}
/**
 * React provider to initialize pyodide with some given packages.
 */
declare const PyodideProvider: ({ packages, children }: Props) => import("react").JSX.Element;
/**
 * `getPyodide` can be used to access pyodide, similar to `usePyodide` but
 * can be used in a non-React context where a hook wont work.
 */
export declare const getPyodide: () => Promise<Pyodide>;
export default PyodideProvider;
