// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxLayoutManager {
  constructor(graph: unknown);
  isEnabled(...args: any[]): unknown;
  setEnabled(enabled: boolean): void;
  isBubbling(...args: any[]): unknown;
  setBubbling(value: unknown): void;
  getGraph(...args: any[]): unknown;
  setGraph(graph: unknown): void;
  hasLayout(cell: unknown): boolean;
  getLayout(cell: unknown, eventName: string): unknown;
  beforeUndo(undoableEdit: unknown): unknown;
  cellsMoved(cells: unknown, evt: unknown): unknown;
  cellsResized(cells: unknown, bounds: unknown, prev: unknown): unknown;
  getAncestorLayout(cell: unknown, eventName: string): unknown;
  getCellsForChanges(changes: unknown): unknown;
  getCellsForChange(change: unknown): unknown;
  addCellsWithLayout(cell: unknown, result: unknown): void;
  addAncestorsWithLayout(cell: unknown, result: unknown): void;
  addDescendantsWithLayout(cell: unknown, result: unknown): void;
  executeLayoutForCells(cells: unknown): unknown;
  layoutCells(cells: unknown, bubble: unknown): unknown;
  executeLayout(cell: unknown, bubble: unknown): unknown;
  destroy(...args: any[]): void;
}