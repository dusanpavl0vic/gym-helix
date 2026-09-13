const COLOR_ATTRIBUTE = /\b(fill|stroke)="(?!none"|currentColor")[^"]*"/gi;
const COLOR_STYLE = /\b(fill|stroke)\s*:\s*(?!none\b|currentColor\b)[^;"]+/gi;

/**
 * Prepares an SVG file for SvgXml: strips size/class metadata and turns hard-coded colors
 * into currentColor so the app can tint the icon. Import-free (used by scripts/icons.ts).
 */
export function normalizeSvg(svg: string): string {
  let out = svg
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  const rootMatch = out.match(/<svg\b[^>]*>/i);
  if (!rootMatch) throw new Error('Not an SVG file');

  let root = rootMatch[0];
  if (!/viewBox=/i.test(root)) {
    const width = root.match(/\bwidth="([\d.]+)/i)?.[1];
    const height = root.match(/\bheight="([\d.]+)/i)?.[1];
    if (width && height) root = root.replace(/<svg\b/i, `<svg viewBox="0 0 ${width} ${height}"`);
  }
  root = root.replace(/\s(width|height)="[^"]*"/gi, '');
  out = out.replace(rootMatch[0], root);

  return out
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(COLOR_ATTRIBUTE, '$1="currentColor"')
    .replace(COLOR_STYLE, '$1:currentColor')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
