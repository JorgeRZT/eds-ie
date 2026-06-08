/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-cover
 * Base block: hero
 * Source: https://iem-brochures.ie.edu/.executive.mba/
 * Selector: .webpub-viewer__epub-container-spread-2 figure.spread-page-1
 * Generated: 2026-06-05
 *
 * Source structure:
 *   figure.spread-page-1
 *     div.webpub-viewer__epub-container-spread-page-sub
 *       #_idContainer000 > div > p.Nuevos-estilos_H1 (main heading)
 *       #_idContainer001.Marco-de-texto-b-sico > div > p.Heading-Abridoras (subtitle/description)
 *
 * Target structure (from library example):
 *   Row 1: Background image (optional - included only if img present)
 *   Row 2: Heading
 *   Row 3: Description text
 */
export default function parse(element, { document }) {
  // Extract heading - primary title (p.Nuevos-estilos_H1 or first major heading)
  const headingEl = element.querySelector('p.Nuevos-estilos_H1, h1, [class*="H1"]');

  // Extract description/subtitle (p.Heading-Abridoras or secondary text container)
  const descriptionEl = element.querySelector('p.Heading-Abridoras, p.Heading-Abridoras, [class*="Heading-Abridoras"]');

  // Extract background image if present (optional)
  const bgImage = element.querySelector('img, picture img, [class*="background"] img');

  // Build cells array matching library example structure
  const cells = [];

  // Row 1: Background image (optional - only if present in source)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Heading - convert to h1 for proper semantic structure
  if (headingEl) {
    const h1 = document.createElement('h1');
    h1.textContent = headingEl.textContent.trim();
    cells.push([h1]);
  }

  // Row 3: Description text
  if (descriptionEl) {
    const p = document.createElement('p');
    p.textContent = descriptionEl.textContent.trim();
    cells.push([p]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cover', cells });
  element.replaceWith(block);
}
