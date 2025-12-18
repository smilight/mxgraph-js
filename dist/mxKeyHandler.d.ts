// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxKeyHandler {
  constructor(graph: unknown, target: unknown);
  isEnabled(...args: any[]): boolean;
  setEnabled(enabled: boolean): void;
  bindKey(code: unknown, funct: unknown): void;
  bindShiftKey(code: unknown, funct: unknown): void;
  bindControlKey(code: unknown, funct: unknown): void;
  bindControlShiftKey(code: unknown, funct: unknown): void;
  isControlDown(evt: unknown): boolean;
  getFunction(evt: unknown): unknown;
  isGraphEvent(evt: unknown): boolean;
  keyDown(evt: unknown): boolean;
  isEnabledForEvent(evt: unknown): boolean;
  isEventIgnored(evt: unknown): boolean;
  escape(evt: unknown): unknown;
  destroy(...args: any[]): void;
}