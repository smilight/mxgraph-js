// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxGraphLayout {
  constructor(graph: unknown);
  moveCell(cell: unknown, x: number, y: number): unknown;
  resizeCell(cell: unknown, bounds: unknown): unknown;
  execute(parent: unknown): unknown;
  getGraph(...args: any[]): unknown;
  getConstraint(key: number, cell: unknown, edge: unknown, source: unknown): unknown;
  isAncestor(parent: unknown, child: unknown, traverseAncestors: unknown): boolean;
  isVertexMovable(cell: unknown): boolean;
  isVertexIgnored(vertex: number): boolean;
  isEdgeIgnored(edge: unknown): boolean;
  setEdgeStyleEnabled(edge: unknown, value: unknown): void;
  setOrthogonalEdge(edge: unknown, value: unknown): void;
  getParentOffset(parent: unknown): unknown;
  setEdgePoints(edge: unknown, points: unknown): void;
  setVertexLocation(cell: unknown, x: number, y: number): void;
  getVertexBounds(cell: unknown): unknown;
  arrangeGroups(cells: unknown, border: unknown, topBorder: number, rightBorder: number, bottomBorder: number, leftBorder: number): unknown;
  static traverse(vertex: number, directed: unknown, func: unknown, edge: unknown, visited: boolean): boolean;
}