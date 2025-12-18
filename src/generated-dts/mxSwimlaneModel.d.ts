// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxSwimlaneModel {
  constructor(layout: number, vertices: unknown, roots: unknown, parent: unknown, tightenToSource: unknown);
  createInternalCells(layout: number, vertices: unknown, internalVertices: unknown): unknown;
  initialRank(...args: any[]): unknown;
  maxChainDfs(parent: unknown, root: unknown, connectingEdge: unknown, seen: unknown, chainCount: number): unknown;
  fixRanks(...args: any[]): unknown;
  visit(visitor: boolean, dfsRoots: unknown, trackAncestors: unknown, seenNodes: unknown): unknown;
  dfs(parent: unknown, root: unknown, connectingEdge: unknown, visitor: boolean, seen: unknown, layer: number): unknown;
  extendedDfs(parent: unknown, root: unknown, connectingEdge: unknown, visitor: boolean, seen: unknown, ancestors: unknown, childHash: unknown, layer: number): unknown;
}