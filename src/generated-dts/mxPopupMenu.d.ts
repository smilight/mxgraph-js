// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxPopupMenu {
  constructor(factoryMethod: number);
  showMenu(...args: any[]): void;
  init(...args: any[]): unknown;
  isEnabled(...args: any[]): unknown;
  setEnabled(enabled: boolean): void;
  isPopupTrigger(me: unknown): boolean;
  addItem(title: unknown, image: unknown, funct: unknown, parent: unknown, iconCls: unknown, enabled: boolean, active: unknown, noHover: unknown): void;
  addCheckmark(item: unknown, img: unknown): void;
  createSubmenu(parent: unknown): unknown;
  showSubmenu(parent: unknown, row: unknown): void;
  addSeparator(parent: unknown, force: boolean): void;
  popup(x: number, y: number, cell: unknown, evt: unknown): unknown;
  isMenuShowing(...args: any[]): boolean;
  hideMenu(...args: any[]): void;
  hideSubmenu(parent: unknown): void;
  destroy(...args: any[]): void;
}