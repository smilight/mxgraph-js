// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxDefaultToolbar {
  constructor(container: unknown, editor: unknown);
  init(container: unknown): unknown;
  addItem(title: unknown, icon: unknown, action: string, pressed: unknown): void;
  addSeparator(icon: unknown): void;
  addCombo(...args: any[]): void;
  addActionCombo(title: unknown): void;
  addActionOption(combo: unknown, title: unknown, action: string): void;
  addOption(combo: unknown, title: unknown, value: unknown): void;
  addMode(title: unknown, icon: unknown, mode: unknown, pressed: unknown, funct: unknown): void;
  addPrototype(title: unknown, icon: unknown, ptype: number, pressed: unknown, insert: unknown, toggle: boolean): void;
  drop(vertex: number, evt: unknown, target: unknown): unknown;
  insert(vertex: number, evt: unknown, target: unknown): unknown;
  connect(vertex: number, evt: unknown, source: unknown): unknown;
  installDropHandler(img: unknown, dropHandler: unknown): unknown;
  destroy(...args: any[]): void;
}