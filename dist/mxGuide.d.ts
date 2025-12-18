// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxGuide {
  constructor(graph: unknown, states: unknown);
  setStates(states: unknown): void;
  isEnabledForEvent(evt: unknown): boolean;
  getGuideTolerance(gridEnabled: number): unknown;
  createGuideShape(horizontal: unknown): unknown;
  isStateIgnored(state: unknown): boolean;
  move(bounds: unknown, delta: unknown, gridEnabled: number, clone: unknown): unknown;
  getDelta(bounds: unknown, stateX: number, dx: number, stateY: number, dy: number): unknown;
  getGuideColor(state: unknown, horizontal: unknown): unknown;
  hide(...args: any[]): void;
  setVisible(visible: boolean): void;
  destroy(...args: any[]): void;
}