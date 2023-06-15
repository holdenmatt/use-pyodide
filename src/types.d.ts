export type JSONValue = string | number | boolean | null | readonly JSONValue[] | {
    [key: string]: JSONValue;
};
