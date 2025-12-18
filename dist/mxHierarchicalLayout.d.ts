// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxHierarchicalLayout {
  constructor(graph: unknown, orientation: unknown, deterministic: boolean);
  getModel(...args: any[]): unknown;
  execute(parent: unknown, roots: unknown): unknown;
  findRoots(parent: unknown, vertices: unknown): unknown;
  getEdges(cell: unknown): unknown;
  getVisibleTerminal(edge: unknown, source: unknown): unknown;
  run(parent: unknown): unknown;
  filterDescendants(cell: unknown, result: unknown): unknown;
  isPort(cell: unknown): boolean;
  getEdgesBetween(source: unknown, target: unknown, directed: unknown): unknown;
  traverse(vertex: number, directed: unknown, edge: unknown, allVertices: unknown, currentComp: unknown, hierarchyVertices: number, filledVertexSet: number): unknown;
  cycleStage(parent: unknown): unknown;
  layeringStage(...args: any[]): unknown;
  crossingStage(parent: unknown): unknown;
  placementStage(initialX: number, parent: unknown): unknown;
}