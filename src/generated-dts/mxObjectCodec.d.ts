// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxObjectCodec {
  constructor(template: unknown, exclude: number, idrefs: number, mapping: unknown);
  getName(...args: any[]): unknown;
  cloneTemplate(...args: any[]): unknown;
  getFieldName(attributename: string): unknown;
  getAttributeName(fieldname: string): unknown;
  isExcluded(obj: unknown, attr: unknown, value: unknown, write: unknown): unknown;
  isReference(obj: unknown, attr: unknown, value: unknown, write: unknown): unknown;
  encode(enc: unknown, obj: unknown): unknown;
  encodeObject(enc: unknown, obj: unknown, node: unknown): unknown;
  encodeValue(enc: unknown, obj: unknown, name: string, value: unknown, node: unknown): unknown;
  writeAttribute(enc: unknown, obj: unknown, name: string, value: unknown, node: unknown): unknown;
  writePrimitiveAttribute(enc: unknown, obj: unknown, name: string, value: unknown, node: unknown): unknown;
  writeComplexAttribute(enc: unknown, obj: unknown, name: string, value: unknown, node: unknown): unknown;
  convertAttributeToXml(enc: unknown, obj: unknown, name: string, value: unknown): unknown;
  isBooleanAttribute(enc: unknown, obj: unknown, name: string, value: unknown): unknown;
  convertAttributeFromXml(dec: unknown, attr: unknown, obj: unknown): unknown;
  isNumericAttribute(dec: unknown, attr: unknown, obj: unknown): unknown;
  beforeEncode(enc: unknown, obj: unknown, node: unknown): unknown;
  afterEncode(enc: unknown, obj: unknown, node: unknown): unknown;
  decode(dec: unknown, node: unknown, into: unknown): unknown;
  decodeNode(dec: unknown, node: unknown, obj: unknown): unknown;
  decodeAttributes(dec: unknown, node: unknown, obj: unknown): unknown;
  isIgnoredAttribute(dec: unknown, attr: unknown, obj: unknown): unknown;
  decodeAttribute(dec: unknown, attr: unknown, obj: unknown): unknown;
  decodeChildren(dec: unknown, node: unknown, obj: unknown): unknown;
  decodeChild(dec: unknown, child: unknown, obj: unknown): unknown;
  getFieldTemplate(obj: unknown, fieldname: string, child: unknown): unknown;
  addObjectValue(obj: unknown, fieldname: string, value: unknown, template: unknown): void;
  processInclude(dec: unknown, node: unknown, into: unknown): unknown;
  beforeDecode(dec: unknown, node: unknown, obj: unknown): unknown;
  afterDecode(dec: unknown, node: unknown, obj: unknown): unknown;
}