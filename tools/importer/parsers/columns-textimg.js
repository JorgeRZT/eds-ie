/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-textimg
 * Base block: columns
 * Source: https://iem-brochures.ie.edu/.executive.mba/
 * Selectors: .webpub-viewer__epub-container-spread-0 figure.spread-page-4,
 *            .webpub-viewer__epub-container-spread-0 figure.spread-page-5
 * Generated: 2026-06-05
 *
 * Extracts text content and/or images from epub spread pages and arranges them
 * as a two-column layout. Handles two variations:
 * - Text frame + image (spread-page-4): text in col 1, image in col 2
 * - Graphic frame + image (spread-page-5): image in col 1, image in col 2
 */
export default function parse(element, { document }) {
  // Extract text content from the text frame container
  // Source has .Marco-de-texto-b-sico (text frame) containing paragraph text
  const textContainer = element.querySelector('[class*="Marco-de-texto"]');
  const textParagraphs = textContainer
    ? Array.from(textContainer.querySelectorAll('p'))
    : [];

  // Extract the main positioned/animated image (present in both variations)
  // Located inside ._idGenAnimation or ._idGenObjectAttribute-4 container
  const animationImage = element.querySelector('._idGenAnimation img, [class*="_idGenAnimation"] img');

  // Extract graphic frame image (present in spread-page-5 variation)
  // .Marco-gr-fico-b-sico is the graphic frame equivalent of the text frame
  const graphicFrame = element.querySelector('[class*="Marco-gr"]');
  const graphicImage = graphicFrame ? graphicFrame.querySelector('img') : null;

  // Build column 1 content: text paragraphs if available, otherwise graphic frame image
  const col1 = [];
  if (textParagraphs.length > 0) {
    textParagraphs.forEach((p) => col1.push(p));
  } else if (graphicImage) {
    col1.push(graphicImage);
  }

  // Build column 2 content: the animated/positioned image
  const col2 = [];
  if (animationImage) {
    col2.push(animationImage);
  }

  // Build cells array matching the Columns block structure:
  // One row with two columns [col1 content | col2 content]
  const cells = [];
  if (col1.length > 0 || col2.length > 0) {
    cells.push([
      col1.length > 0 ? col1 : '',
      col2.length > 0 ? col2 : '',
    ]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-textimg', cells });
  element.replaceWith(block);
}
