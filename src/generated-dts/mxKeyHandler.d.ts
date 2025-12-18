// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxKeyHandler {
  constructor(graph: unknown, target: unknown);
  isEnabled(...args: any[]): unknown;
  setEnabled(enabled: boolean): void;
  bindKey(code: unknown, funct: unknown): void;
  bindShiftKey(code: unknown, funct: unknown): void;
  bindControlKey(code: unknown, funct: unknown): void;
  bindControlShiftKey(code: unknown, funct: unknown): void;
  isControlDown(evt: unknown): unknown;
  getFunction(evt: unknown): unknown;
  isGraphEvent(evt: unknown): unknown;
  keyDown(evt: unknown): unknown;
  isEnabledForEvent(evt: unknown): unknown;
  isEventIgnored(evt: unknown): unknown;
  escape(evt: unknown): unknown;
  destroy(...args: any[]): void;
}