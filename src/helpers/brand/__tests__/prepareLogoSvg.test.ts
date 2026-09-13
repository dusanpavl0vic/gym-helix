import { innerSvg, monochromeSvg, prefixSvgIds, stripSvgSize, viewBoxOf } from '../prepareLogoSvg';

const logo = `<svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)"><path d="M0 0" fill="white"/><path d="M1 1" stroke="#9BBF6A" stroke-width="60"/></g>
<defs><clipPath id="clip0"><rect width="500" height="500" fill="white"/></clipPath></defs>
</svg>`;

describe('prepareLogoSvg', () => {
  it('strips the root size but keeps the viewBox', () => {
    const out = stripSvgSize(logo);
    expect(out.match(/<svg[^>]*>/)?.[0]).not.toMatch(/width=|height=/);
    expect(viewBoxOf(out)).toBe('0 0 500 500');
    expect(out).toContain('<rect width="500"');
  });

  it('extracts the inner content', () => {
    expect(innerSvg(logo).startsWith('<g clip-path')).toBe(true);
    expect(innerSvg(logo)).not.toContain('</svg>');
  });

  it('paints fills and strokes in one color, keeping none and url references', () => {
    const out = monochromeSvg(`${logo}<path fill="none" stroke="url(#g)"/>`, '#FFFFFF');
    expect(out).toContain('fill="#FFFFFF"');
    expect(out).toContain('stroke="#FFFFFF"');
    expect(out).toContain('fill="none"');
    expect(out).toContain('stroke="url(#g)"');
  });

  it('prefixes ids and their references', () => {
    const out = prefixSvgIds(logo, 'a-');
    expect(out).toContain('id="a-clip0"');
    expect(out).toContain('url(#a-clip0)');
  });
});
