// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxMultiplicity {
  constructor(source: unknown, type: number, attr: unknown, value: unknown, min: unknown, max: number, validNeighbors: number, countError: number, typeError: number, validNeighborsAllowed: number);
  check(graph: unknown, edge: unknown, source: unknown, target: unknown, sourceOut: unknown, targetIn: unknown): unknown;
  checkNeighbors(graph: unknown, edge: unknown, source: unknown, target: unknown): unknown;
  checkTerminal(graph: unknown, terminal: unknown, edge: unknown): boolean;
  checkType(graph: unknown, value: unknown, type: number, attr: unknown, attrValue: unknown): unknown;
}