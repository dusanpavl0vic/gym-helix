/** Helpers to embed the brand logo SVG. Import-free so scripts/generate-brand-assets.ts can load it directly. */

const ROOT_TAG = /<svg\b[^>]*>/i;

/** Removes the XML prolog and the root width/height so the logo scales to its container. */
export function stripSvgSize(svg: string): string {
  const cleaned = svg.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  const root = cleaned.match(ROOT_TAG);
  if (!root) throw new Error('Not an SVG file');
  return cleaned.replace(root[0], root[0].replace(/\s(width|height)="[^"]*"/gi, ''));
}

export function viewBoxOf(svg: string): string {
  const viewBox = svg.match(ROOT_TAG)?.[0].match(/viewBox="([^"]+)"/i)?.[1];
  if (!viewBox) throw new Error('The logo SVG needs a viewBox');
  return viewBox;
}

/** Content between the root <svg> tags, for nesting inside another SVG. */
export function innerSvg(svg: string): string {
  const root = svg.match(ROOT_TAG);
  const end = svg.lastIndexOf('</svg>');
  if (!root || end < 0) throw new Error('Not an SVG file');
  return svg.slice((root.index ?? 0) + root[0].length, end).trim();
}

/** Paints every visible fill and stroke with one color (Android themed / monochrome icon). */
export function monochromeSvg(svg: string, color: string): string {
  return svg.replace(/\b(fill|stroke)="(?!none")[^"]*"/gi, (match, attribute: string) =>
    match.includes('url(') ? match : `${attribute}="${color}"`,
  );
}

/** Keeps clipPath ids unique when the same logo is placed more than once in one document. */
export function prefixSvgIds(svg: string, prefix: string): string {
  return svg.replace(/\bid="([^"]+)"/g, `id="${prefix}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`);
}
