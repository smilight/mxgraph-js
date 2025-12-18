// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxConstraintHandler {
  constructor(graph: unknown);
  isEnabled(...args: any[]): unknown;
  setEnabled(enabled: boolean): void;
  reset(...args: any[]): void;
  getTolerance(me: unknown): unknown;
  getImageForConstraint(state: unknown, constraint: unknown, point: unknown): unknown;
  isEventIgnored(me: unknown, source: unknown): unknown;
  isStateIgnored(state: unknown, source: unknown): unknown;
  destroyIcons(...args: any[]): void;
  destroyFocusHighlight(...args: any[]): void;
  isKeepFocusEvent(me: unknown): unknown;
  getCellForEvent(me: unknown, point: unknown): unknown;
  update(me: unknown, source: unknown, existingEdge: number, point: unknown): void;
  redraw(...args: any[]): void;
  setFocus(me: unknown, state: unknown, source: unknown): void;
  createHighlightShape(...args: any[]): unknown;
  intersects(icon: unknown, mouse: boolean, source: unknown, existingEdge: number): unknown;
  destroy(...args: any[]): void;
}