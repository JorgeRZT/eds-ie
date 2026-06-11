/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion
 * Source: https://iem-brochures.ie.edu/.executive.mba/ (page 9)
 * "¿A quién va dirigido el Executive MBA?"
 *
 * The source is an InDesign multi-state object: the 6 item titles repeat once
 * per animation state, with the 6 unique descriptions interleaved. We collect
 * the unique titles (in order) and the unique descriptions (in order) and pair
 * them by index.
 */
export default function parse(element, { document }) {
  const heading = '¿A quién va dirigido el Executive MBA?';
  const titleSet = new Set([
    heading,
    'Líderes decididos a impulsar el cambio',
    'Líderes que se anticipen a las tendencias',
    'Aspirantes a la alta dirección C-Suite',
    'Líderes dispuestos a ir un paso más allá',
    'Líderes con una gran red de contactos',
    'Líderes capaces de reinventarse',
  ]);

  const allParagraphs = Array.from(element.querySelectorAll('p'))
    .map((p) => p.textContent.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  // Unique item titles in first-seen order (excludes section heading)
  const titles = [];
  const seenTitles = new Set();
  allParagraphs.forEach((t) => {
    if (titleSet.has(t) && t !== heading && !seenTitles.has(t)) {
      seenTitles.add(t);
      titles.push(t);
    }
  });

  // Unique descriptions in first-seen order (anything not a known title)
  const descriptions = [];
  const seenDesc = new Set();
  allParagraphs.forEach((t) => {
    if (!titleSet.has(t) && !seenDesc.has(t)) {
      seenDesc.add(t);
      descriptions.push(t);
    }
  });

  if (titles.length === 0) {
    element.remove();
    return;
  }

  const cells = [[heading]];
  titles.forEach((title, i) => {
    cells.push([title, descriptions[i] || '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion', cells });
  element.replaceWith(block);
}
