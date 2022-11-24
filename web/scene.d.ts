
export type ChoiceScriptValue = number | string | boolean;

export interface ChoiceScriptLine {
	contents: string,
	lineNum: number
}

export interface ChoiceScriptLabel {
	[name: string]: number;
}

export interface ChoiceScriptOperator {
	name: string;
	test: (p1: any, p2: any, line: number, sceneObj: any) => any;
}

export interface ChoiceScriptToken {
	name: string;
	test: (str: string, line?: number, sceneObj?: any) => string | null;
}

export interface ChoiceScriptError {
	lineNum?: number,
	message: string
}

export interface ChoiceScriptStackToken {
	name: string,
	value: string,
	pos: number
}

export type ChoiceScriptStack = ChoiceScriptStackToken[];
export type ChoiceScriptReferenceOptions = {
	toLowerCase?: boolean
}

export class Scene {
	constructor(name?: string, stats?: {}, nav?: {}, options?: {});
	public static readonly baseUrl: string;
	public static readonly initialCommands: { [ command: string ]: boolean }; // actually numbers, but ...
	public static readonly validCommands: { [ command: string ]: boolean };   // ditto
	public static readonly operators: {
		"+": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
		"-": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
		"*": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
		"/": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
		"^": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
		"&": (left: string, right: string) => number | never,
		"#": (str: string, pos: number, lineNum: number, scene: Scene) => number | never,
		"%+": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
		"%-": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
		"=": (left: ChoiceScriptValue, right: ChoiceScriptValue) => (boolean | never) | ((left: string, right: string) => boolean | never),
		"<": (left: number, right: number, lineNum: number, scene: Scene) => boolean | never,
		">": (left: number, right: number, lineNum: number, scene: Scene) => boolean | never,
		"!=": (left: ChoiceScriptValue, right: ChoiceScriptValue, lineNum: number, scene: Scene) => boolean | never,
		"and": (left: boolean, right: boolean, lineNum: number, scene: Scene) => boolean | never,
		"or": (left: boolean, right: boolean, lineNum: number, scene: Scene) => boolean | never,
		"modulo": (left: number, right: number, lineNum: number, scene: Scene) => number | never,
	};
	public static readonly tokens:  ChoiceScriptToken[] & { 'token': boolean };

	public functions: {
		not: (value: boolean) => boolean;
		round: (value: number) => number;
		timestamp: (date: string) => number;
		log: (value: number) => number;
		length: (value: string) => number;
		auto: () => never;
	}
	public loaded: boolean;
	public crc: string;
	public lines: string[];
	public lineNum: number;
	public labels: { [ label: string ]: number };
	public looplimit_count: number;
	public baseUrl: string;
	public looplimit(limit: number): void;
	public parseOptionIf(line: string): { result: boolean, line: string, condition: never };
	public parseLabels(): void;
	public parseInputText(line: string): string | never;
	public parseGotoScene(): { sceneName: string, label: string, param: ChoiceScriptValue[] | never};
	public validateVariable(variable: string): boolean | never;
	public evaluateValueExpr(expr: string): ChoiceScriptValue | never;
	public evaluateReference(stack: ChoiceScriptStack, options?: ChoiceScriptReferenceOptions): string;
	public evaluateExpr(stack: ChoiceScriptStack, parenthetical: string): ChoiceScriptValue | never;
	public tokenizeExpr(str: string): ChoiceScriptStack | never;
	public replaceVariables(line: string): string | never;
	public validateVariable(name: string): void | never;
	public verifyOptionsMatch(prev: string[], current: string): void | never;
	public getIndent(line: string): number | never;
}