// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxPrintPreview {
  constructor(graph: unknown, scale: number, pageFormat: unknown, border: unknown, x0: number, y0: number, borderColor: string, title: unknown, pageSelector: unknown);
  renderPage(w: unknown, h: unknown, x: number, y: number, content: unknown, pageNumber: unknown): unknown;
  getWindow(...args: any[]): unknown;
  getDoctype(...args: any[]): unknown;
  appendGraph(graph: unknown, scale: number, x0: number, y0: number, forcePageBreaks: boolean, keepOpen: unknown): unknown;
  open(css: unknown, targetWindow: unknown, forcePageBreaks: boolean, keepOpen: unknown): unknown;
  addPageBreak(doc: unknown): void;
  closeDocument(...args: any[]): unknown;
  writeHead(doc: unknown, css: unknown): unknown;
  writePostfix(doc: unknown): unknown;
  createPageSelector(vpages: unknown, hpages: unknown): unknown;
  getRoot(...args: any[]): unknown;
  addGraphFragment(dx: number, dy: number, scale: number, pageNumber: unknown, div: unknown, clip: unknown): void;
  getLinkForCellState(state: unknown): unknown;
  insertBackgroundImage(div: unknown, dx: number, dy: number): unknown;
  getCoverPages(...args: any[]): unknown;
  getAppendices(...args: any[]): unknown;
  print(css: unknown): unknown;
  close(...args: any[]): unknown;
}