import { normalizeSvg } from '../normalizeSvg';

describe('normalizeSvg', () => {
  it('keeps currentColor and none, strips size and class', () => {
    const svg = `<?xml version="1.0"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">\n  <path stroke="none" d="M0 0h24v24H0z" fill="none" />\n  <path d="M2 12h1" />\n</svg>`;
    const out = normalizeSvg(svg);
    expect(out).not.toMatch(/width=|height=|class=|<\?xml/);
    expect(out).toContain('stroke="currentColor"');
    expect(out).toContain('stroke="none"');
    expect(out).toContain('><path');
  });

  it('turns hard-coded colors into currentColor and adds a viewBox', () => {
    const out = normalizeSvg('<svg width="32" height="32"><path fill="#000000" style="stroke:#123456" d="M0 0"/></svg>');
    expect(out).toContain('viewBox="0 0 32 32"');
    expect(out).toContain('fill="currentColor"');
    expect(out).toContain('stroke:currentColor');
  });

  it('rejects non-SVG content', () => {
    expect(() => normalizeSvg('<html></html>')).toThrow();
  });
});
