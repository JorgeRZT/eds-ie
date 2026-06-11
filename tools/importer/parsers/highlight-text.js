/* eslint-disable */
/* global WebImporter */

/**
 * Parser for highlight-text
 * Source: https://iem-brochures.ie.edu/.executive.mba/ (page 6)
 * Extracts the highlighted statement paragraph (coach text) on the light-blue panel.
 */
export default function parse(element, { document }) {
  const textContainer = element.querySelector('[class*="Marco-de-texto"]');
  const paragraphs = textContainer
    ? Array.from(textContainer.querySelectorAll('p'))
    : Array.from(element.querySelectorAll('p'));

  const content = paragraphs.filter((p) => p.textContent.trim().length > 0);
  if (content.length === 0) {
    element.remove();
    return;
  }

  const cells = content.map((p) => [p]);
  const block = WebImporter.Blocks.createBlock(document, { name: 'highlight-text', cells });
  element.replaceWith(block);
}
