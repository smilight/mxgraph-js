// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.
export declare class mxStencil {
  constructor(desc: unknown);
  parseDescription(...args: any[]): unknown;
  parseConstraints(...args: any[]): unknown;
  parseConstraint(node: unknown): unknown;
  evaluateTextAttribute(node: unknown, attribute: unknown, shape: unknown): unknown;
  evaluateAttribute(node: unknown, attribute: unknown, shape: unknown): unknown;
  drawShape(canvas: unknown, shape: unknown, x: number, y: number, w: unknown, h: unknown): unknown;
  drawChildren(canvas: unknown, shape: unknown, x: number, y: number, w: unknown, h: unknown, node: unknown, aspect: unknown, disableShadow: boolean, paint: unknown): unknown;
  computeAspect(shape: unknown, x: number, y: number, w: unknown, h: unknown, direction: unknown): unknown;
  drawNode(canvas: unknown, shape: unknown, node: unknown, aspect: unknown, disableShadow: boolean, paint: unknown): unknown;
}