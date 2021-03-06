import { Color, PDFContentStream, PDFDocument, PDFFont, PDFImage, PDFPage, PDFPageDrawEllipseOptions, PDFPageDrawImageOptions, PDFPageDrawLineOptions, PDFPageDrawRectangleOptions, PDFPageDrawSVGOptions, PDFPageDrawTextOptions, PDFRef, TextAlignment, Rotation } from 'pdf-lib';
interface Margins {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface Point {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export declare enum RectangleAlignment {
    TopLeft = 0,
    TopCenter = 1,
    TopRight = 2,
    CenterLeft = 3,
    Center = 4,
    CenterRight = 5,
    BottomLeft = 6,
    BottomCenter = 7,
    BottomRight = 8
}
export interface PDFDocumentBuilderOptions {
    margins: Margins;
}
export interface PDFBuilderPageDrawImageOptions extends PDFPageDrawImageOptions {
    fit?: {
        width?: number;
        height?: number;
    };
    align?: AlignSetting;
}
export interface PDFBuilderPageDrawTextOptions extends PDFPageDrawTextOptions {
    lineBreak?: boolean;
    align?: TextAlignment;
    maxLines?: number;
}
export interface PDFBuilderPageDrawRectangleOptions extends PDFPageDrawRectangleOptions {
    align?: RectangleAlignment;
}
export declare function rotatePoint(point: Point, rotation: Rotation): Point;
export declare class PDFDocumentBuilder {
    doc: PDFDocument;
    page: PDFPage;
    options: PDFDocumentBuilderOptions;
    font: PDFFont;
    private fontKey?;
    fontSize: number;
    fontColor: Color;
    /** The factor a line is larger than it's font size */
    lineHeightFactor: number;
    pageIndex: number;
    contentStream?: PDFContentStream;
    contentStreamRef?: PDFRef;
    constructor(doc: PDFDocument, options?: Partial<PDFDocumentBuilderOptions>);
    moveDown(lines?: number): void;
    setFont(font: PDFFont): void;
    getFont(): [PDFFont, string];
    setFontSize(size: number): void;
    setLineHeight(lineHeight: number): void;
    text(text: string, options?: PDFBuilderPageDrawTextOptions): void;
    image(input: string | PDFImage, options?: PDFBuilderPageDrawImageOptions): Promise<PDFImage>;
    rect(options: PDFBuilderPageDrawRectangleOptions): void;
    ellipse(options?: PDFPageDrawEllipseOptions): void;
    line(options: PDFPageDrawLineOptions): void;
    svgPath(path: string, options: PDFPageDrawSVGOptions): void;
    moveTo(x: number, y: number): void;
    hexColor(hex: string): import("pdf-lib").RGB;
    switchToPage(index: number): void;
    addPage(): void;
    nextPage(): void;
    setFontColor(fontColor: Color): void;
    private convertY;
    get lineHeight(): number;
    get isLastPage(): boolean;
    get x(): number;
    get y(): number;
    set x(newX: number);
    set y(newY: number);
    get maxY(): number;
    getContentStream(useExisting?: boolean): PDFContentStream;
    private createContentStream;
    private maybeEmbedGraphicsState;
}
export default PDFDocumentBuilder;
