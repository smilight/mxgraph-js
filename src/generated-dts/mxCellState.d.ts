// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxCellState {
  constructor(view: unknown, cell: unknown, style: number);
  getPerimeterBounds(border: unknown, bounds: unknown): unknown;
  setAbsoluteTerminalPoint(point: unknown, isSource: boolean): void;
  setCursor(cursor: unknown): void;
  getVisibleTerminal(source: unknown): unknown;
  getVisibleTerminalState(source: unknown): unknown;
  setVisibleTerminalState(terminalState: unknown, source: unknown): void;
  getCellBounds(...args: any[]): unknown;
  getPaintBounds(...args: any[]): boolean;
  updateCachedBounds(...args: any[]): void;
  setState(state: unknown): void;
  clone(...args: any[]): unknown;
  destroy(...args: any[]): void;
}