// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxCellMarker {
  constructor(graph: unknown, validColor: number, invalidColor: number, hotspot: unknown);
  setEnabled(enabled: boolean): void;
  isEnabled(...args: any[]): unknown;
  setHotspot(hotspot: unknown): void;
  getHotspot(...args: any[]): unknown;
  setHotspotEnabled(enabled: boolean): void;
  isHotspotEnabled(...args: any[]): boolean;
  hasValidState(...args: any[]): boolean;
  getValidState(...args: any[]): unknown;
  getMarkedState(...args: any[]): unknown;
  reset(...args: any[]): void;
  process(me: unknown): boolean;
  setCurrentState(state: unknown, me: unknown, color: string): void;
  markCell(cell: unknown, color: string): unknown;
  mark(...args: any[]): unknown;
  unmark(...args: any[]): unknown;
  isValidState(state: unknown): boolean;
  getMarkerColor(evt: unknown, state: unknown, isValid: number): unknown;
  getState(me: unknown): unknown;
  getCell(me: unknown): unknown;
  getStateToMark(state: unknown): unknown;
  intersects(state: unknown, me: unknown): boolean;
  destroy(...args: any[]): void;
}