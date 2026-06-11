/* eslint-disable */
/* global WebImporter */

/**
 * Parser for alumni-story
 * Source: https://iem-brochures.ie.edu/.executive.mba/ (pages 12 + 13)
 * "Marcando la diferencia" — alumni video + career timeline.
 *
 * On desktop pages 12 (video + name) and 13 (intro + timeline) form one screen.
 * This parser targets the page-13 figure but reads the video from the page-12
 * sibling within the same section wrapper, then removes that sibling so no
 * stray content is left behind.
 *
 * Output rows:
 *   [title | caption]
 *   [video link | intro paragraph]
 *   ['' | [period, role, company] <p> lines] x3
 */
export default function parse(element, { document }) {
  const title = 'Marcando la diferencia';
  const intro = 'Descubre la historia de Carmen, una destacada alumna del Executive MBA que ha trazado un camino inspirador en el mundo empresarial.';

  const scope = element.closest('[data-section]') || element.parentElement || element;

  // Video lives in the sibling figure (page 12).
  const mediaEl = scope.querySelector('a[href$=".mp4"], source[src$=".mp4"], video');
  let mediaCell = '';
  if (mediaEl) {
    let src = mediaEl.getAttribute('href') || mediaEl.getAttribute('src') || '';
    src = src.replace(/^.*\/(?=[^/]+\.mp4)/, 'https://iem-brochures.ie.edu/');
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    mediaCell = [a];
  }

  const captionP = document.createElement('p');
  captionP.innerHTML = '<strong>Carmen Carreño.</strong> Promoción de 2021';

  const introP = document.createElement('p');
  introP.textContent = intro;

  // Timeline: group sibling <p> elements that share the same parent. A group
  // whose first line looks like a date/period is a timeline step.
  const groups = new Map();
  Array.from(element.querySelectorAll('p')).forEach((p) => {
    const text = p.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;
    const parent = p.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(text);
  });

  const isPeriod = (t) => /(\d{4}|actualidad|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i.test(t);
  const steps = [];
  const seen = new Set();
  groups.forEach((lines) => {
    if (lines.length >= 2 && isPeriod(lines[0]) && lines[0] !== intro) {
      const key = lines.join('|');
      if (!seen.has(key)) {
        seen.add(key);
        steps.push(lines);
      }
    }
  });

  const cells = [];
  cells.push([title, captionP]);
  cells.push([mediaCell, introP]);
  steps.forEach((lines) => {
    const periodP = document.createElement('p');
    periodP.textContent = lines[0];
    const frag = [periodP];
    lines.slice(1).forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      frag.push(p);
    });
    cells.push(['', frag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'alumni-story', cells });

  // Remove the sibling figures in this section so nothing else is left behind.
  Array.from(scope.querySelectorAll('figure')).forEach((f) => {
    if (f !== element) f.remove();
  });

  element.replaceWith(block);
}
