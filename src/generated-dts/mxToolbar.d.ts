// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxToolbar {
  constructor(container: unknown);
  addItem(title: unknown, icon: unknown, funct: unknown, pressedIcon: unknown, style: number, factoryMethod: number): void;
  addCombo(style: number): void;
  addActionCombo(title: unknown, style: number): void;
  addOption(combo: unknown, title: unknown, value: unknown): void;
  addSwitchMode(title: unknown, icon: unknown, funct: unknown, pressedIcon: unknown, style: number): void;
  addMode(title: unknown, icon: unknown, funct: unknown, pressedIcon: unknown, style: number, toggle: boolean): void;
  selectMode(domNode: unknown, funct: unknown): unknown;
  resetMode(forced: boolean): void;
  addSeparator(icon: unknown): void;
  addBreak(...args: any[]): void;
  addLine(...args: any[]): void;
  destroy(...args: any[]): void;
}