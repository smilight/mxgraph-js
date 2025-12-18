// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxDragSource {
  constructor(element: unknown, dropHandler: unknown);
  isEnabled(...args: any[]): unknown;
  setEnabled(value: unknown): void;
  isGuidesEnabled(...args: any[]): unknown;
  setGuidesEnabled(value: unknown): void;
  isGridEnabled(...args: any[]): unknown;
  setGridEnabled(value: unknown): void;
  getGraphForEvent(evt: unknown): unknown;
  getDropTarget(graph: unknown, x: number, y: number, evt: unknown): unknown;
  createDragElement(evt: unknown): unknown;
  createPreviewElement(graph: unknown): unknown;
  isActive(...args: any[]): boolean;
  reset(...args: any[]): void;
  mouseDown(evt: unknown): unknown;
  startDrag(evt: unknown): void;
  stopDrag(...args: any[]): void;
  removeDragElement(...args: any[]): void;
  getElementForEvent(evt: unknown): unknown;
  graphContainsEvent(graph: unknown, evt: unknown): boolean;
  mouseMove(evt: unknown): unknown;
  mouseUp(evt: unknown): unknown;
  removeListeners(...args: any[]): void;
  dragEnter(graph: unknown, evt: unknown): unknown;
  dragExit(graph: unknown, evt: unknown): unknown;
  dragOver(graph: unknown, evt: unknown): unknown;
  drop(graph: unknown, evt: unknown, dropTarget: unknown, x: number, y: number): unknown;
}