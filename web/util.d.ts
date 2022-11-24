export function trim(str: string): string;
export function num(value: number, lineNum: number, sceneName: string): number | never;
export function bool(value: boolean | string, lineNum: number, sceneName: string): boolean | never;
export function matchBracket(line: string, brackets: string[], startIndex: number): number;