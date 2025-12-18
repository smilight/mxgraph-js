// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxCompactTreeLayout {
  constructor(graph: unknown, horizontal: unknown, invert: unknown);
  isVertexIgnored(vertex: number): unknown;
  isHorizontal(...args: any[]): unknown;
  execute(parent: unknown, root: unknown): unknown;
  moveNode(node: unknown, dx: number, dy: number): unknown;
  sortOutgoingEdges(source: unknown, edges: unknown): unknown;
  findRankHeights(node: unknown, rank: unknown): unknown;
  setCellHeights(node: unknown, rank: unknown): void;
  dfs(cell: unknown, parent: unknown): unknown;
  layout(node: unknown): unknown;
  horizontalLayout(node: unknown, x0: number, y0: number, bounds: unknown): unknown;
  verticalLayout(node: unknown, parent: unknown, x0: number, y0: number, bounds: unknown): unknown;
  attachParent(node: unknown, height: number): unknown;
  layoutLeaf(node: unknown): unknown;
  join(node: unknown): unknown;
  merge(p1: unknown, p2: unknown): unknown;
  offset(p1: unknown, p2: unknown, a1: unknown, a2: unknown, b1: unknown, b2: unknown): unknown;
  bridge(line1: unknown, x1: number, y1: number, line2: unknown, x2: number, y2: number): unknown;
  createNode(cell: unknown): unknown;
  apply(node: unknown, bounds: unknown): unknown;
  createLine(dx: number, dy: number, next: number): unknown;
  adjustParents(...args: any[]): unknown;
  localEdgeProcessing(node: unknown): unknown;
  processNodeOutgoing(node: unknown): unknown;
}