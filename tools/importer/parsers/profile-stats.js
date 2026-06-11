/* eslint-disable */
/* global WebImporter */

/**
 * Parser for profile-stats
 * Source: https://iem-brochures.ie.edu/.executive.mba/ (page 10)
 * "Contactos para toda la vida" — portrait with overlaid stat bubbles.
 *
 * Source paragraphs alternate [label, number, label, number, ...] and end with
 * the section title. Output rows:
 *   [title]
 *   [portrait image]
 *   [number | label] x3
 */
export default function parse(element, { document }) {
  const title = 'Contactos para toda la vida';
  const paragraphs = Array.from(element.querySelectorAll('p'))
    .map((p) => p.textContent.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  // Pair each number-like paragraph with the preceding label.
  const isNumber = (t) => /^[+\-]?\d/.test(t);
  const stats = [];
  paragraphs.forEach((t, i) => {
    if (isNumber(t)) {
      const label = i > 0 ? paragraphs[i - 1] : '';
      if (label && label !== title) stats.push([t, label]);
    }
  });

  // Main portrait photo (largest "emba" person photo; fall back to first webp).
  const imgs = Array.from(element.querySelectorAll('img'));
  const portrait = imgs.find((img) => /emba/i.test(img.getAttribute('src') || ''))
    || imgs.find((img) => /\.webp$/i.test(img.getAttribute('src') || ''))
    || imgs[0];

  if (stats.length === 0) {
    element.remove();
    return;
  }

  const cells = [];
  cells.push([title]);
  cells.push([portrait ? [portrait] : '']);
  stats.forEach((s) => cells.push(s));

  const block = WebImporter.Blocks.createBlock(document, { name: 'profile-stats', cells });
  element.replaceWith(block);
}
