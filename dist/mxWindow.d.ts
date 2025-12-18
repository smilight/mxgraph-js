// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxWindow {
  constructor(title: unknown, content: unknown, x: number, y: number, width: number, height: number, minimizable: unknown, movable: unknown, replaceNode: unknown, style: number);
  init(x: number, y: number, width: number, height: number, style: number): unknown;
  setTitle(title: unknown): void;
  setScrollable(scrollable: unknown): void;
  activate(...args: any[]): unknown;
  getElement(...args: any[]): unknown;
  fit(...args: any[]): unknown;
  isResizable(...args: any[]): boolean;
  setResizable(resizable: unknown): void;
  setSize(width: number, height: number): void;
  setMinimizable(minimizable: unknown): void;
  getMinimumSize(...args: any[]): unknown;
  installMinimizeHandler(...args: any[]): unknown;
  setMaximizable(maximizable: number): void;
  installMaximizeHandler(...args: any[]): unknown;
  installMoveHandler(...args: any[]): unknown;
  setLocation(x: number, y: number): void;
  getX(...args: any[]): unknown;
  getY(...args: any[]): unknown;
  installCloseHandler(...args: any[]): unknown;
  setImage(image: unknown): void;
  setClosable(closable: unknown): void;
  isVisible(...args: any[]): boolean;
  setVisible(visible: boolean): void;
  show(...args: any[]): void;
  hide(...args: any[]): void;
  destroy(...args: any[]): void;
}