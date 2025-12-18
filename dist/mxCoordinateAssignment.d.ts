// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxCoordinateAssignment {
  constructor(layout: number, intraCellSpacing: unknown, interRankCellSpacing: unknown, orientation: unknown, initialX: number, parallelEdgeSpacing: unknown);
  printStatus(...args: any[]): unknown;
  execute(parent: unknown): unknown;
  minNode(model: unknown): unknown;
  medianPos(i: unknown, model: unknown): unknown;
  rankMedianPosition(rankValue: unknown, model: unknown, nextRankValue: number): unknown;
  calculatedWeightedValue(currentCell: unknown, collection: unknown): unknown;
  medianXValue(connectedCells: unknown, rankValue: unknown): unknown;
  initialCoords(facade: unknown, model: unknown): unknown;
  rankCoordinates(rankValue: unknown, graph: unknown, model: unknown): unknown;
  calculateWidestRank(graph: unknown, model: unknown): unknown;
  minPath(graph: unknown, model: unknown): unknown;
  repositionValid(model: unknown, cell: unknown, rank: unknown, position: unknown): unknown;
  setCellLocations(graph: unknown, model: unknown): void;
  localEdgeProcessing(model: unknown): unknown;
  setEdgePosition(cell: unknown): void;
  setVertexLocation(cell: unknown): void;
  processReversedEdge(graph: unknown, model: unknown): unknown;
}