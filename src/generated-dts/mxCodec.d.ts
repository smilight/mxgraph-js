// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxCodec {
  constructor(document: unknown);
  encode(obj: unknown): unknown;
  putObject(id: number, obj: unknown): unknown;
  getObject(id: number): unknown;
  lookup(id: number): unknown;
  getElementById(id: number): unknown;
  updateElements(...args: any[]): void;
  addElement(node: unknown): void;
  getId(obj: unknown): unknown;
  reference(obj: unknown): unknown;
  decode(node: unknown, into: unknown): unknown;
  encodeCell(cell: unknown, node: unknown, includeChildren: unknown): unknown;
  isCellCodec(codec: unknown): unknown;
  decodeCell(node: unknown, restoreStructures: unknown): unknown;
  insertIntoGraph(cell: unknown): unknown;
  setAttribute(node: unknown, attribute: unknown, value: unknown): void;
}