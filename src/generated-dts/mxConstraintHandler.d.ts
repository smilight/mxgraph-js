// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxConstraintHandler {
  constructor(graph: unknown);
  isEnabled(...args: any[]): unknown;
  setEnabled(enabled: boolean): void;
  reset(...args: any[]): void;
  getTolerance(me: unknown): mxGraph;
  getImageForConstraint(state: unknown, constraint: unknown, point: unknown): unknown;
  isEventIgnored(me: unknown, source: unknown): boolean;
  isStateIgnored(state: unknown, source: unknown): boolean;
  destroyIcons(...args: any[]): void;
  destroyFocusHighlight(...args: any[]): void;
  isKeepFocusEvent(me: unknown): boolean;
  getCellForEvent(me: unknown, point: unknown): unknown;
  update(me: unknown, source: unknown, existingEdge: number, point: unknown): void;
  redraw(...args: any[]): void;
  setFocus(me: unknown, state: unknown, source: unknown): void;
  createHighlightShape(...args: any[]): boolean;
  intersects(icon: unknown, mouse: boolean, source: unknown, existingEdge: number): boolean;
  destroy(...args: any[]): void;
}