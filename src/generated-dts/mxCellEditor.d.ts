// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxCellEditor {
  constructor(graph: unknown);
  init(...args: any[]): unknown;
  applyValue(state: unknown, value: unknown): unknown;
  setAlign(align: unknown): void;
  getInitialValue(state: unknown, trigger: unknown): unknown;
  getCurrentValue(state: unknown): unknown;
  isCancelEditingKeyEvent(evt: unknown): boolean;
  installListeners(elt: unknown): unknown;
  isStopEditingEvent(evt: unknown): boolean;
  isEventSource(evt: unknown): boolean;
  resize(...args: any[]): unknown;
  focusLost(...args: any[]): unknown;
  getBackgroundColor(state: unknown): unknown;
  isLegacyEditor(...args: any[]): boolean;
  startEditing(cell: unknown, trigger: unknown): void;
  isSelectText(...args: any[]): unknown;
  clearSelection(...args: any[]): void;
  stopEditing(cancel: unknown): void;
  prepareTextarea(...args: any[]): unknown;
  isHideLabel(state: unknown): boolean;
  getMinimumSize(state: unknown): unknown;
  getEditorBounds(state: unknown): unknown;
  getEmptyLabelText(cell: unknown): unknown;
  getEditingCell(...args: any[]): unknown;
  destroy(...args: any[]): void;
}