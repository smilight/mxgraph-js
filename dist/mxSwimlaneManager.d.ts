// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxSwimlaneManager {
  constructor(graph: unknown, horizontal: unknown, addEnabled: boolean, resizeEnabled: number);
  isEnabled(...args: any[]): unknown;
  setEnabled(value: unknown): void;
  isHorizontal(...args: any[]): unknown;
  setHorizontal(value: unknown): void;
  isAddEnabled(...args: any[]): unknown;
  setAddEnabled(value: unknown): void;
  isResizeEnabled(...args: any[]): unknown;
  setResizeEnabled(value: unknown): void;
  getGraph(...args: any[]): unknown;
  setGraph(graph: unknown): void;
  isSwimlaneIgnored(swimlane: unknown): boolean;
  isCellHorizontal(cell: unknown): boolean;
  cellsAdded(cells: unknown): unknown;
  swimlaneAdded(swimlane: unknown): unknown;
  cellsResized(cells: unknown): boolean;
  resizeSwimlane(swimlane: unknown, w: unknown, h: unknown, parentHorizontal: unknown): unknown;
  destroy(...args: any[]): void;
}