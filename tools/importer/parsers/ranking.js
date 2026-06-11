/* eslint-disable */
/* global WebImporter */

/**
 * Parser for ranking
 * Base block: ranking
 * Source: https://iem-brochures.ie.edu/.executive.mba/ (page 6)
 * Extracts the rotating business-school ranking image (animated GIF) and
 * arranges it as a single-cell ranking block.
 */
export default function parse(element, { document }) {
  const rankingImg = element.querySelector('img[src*="BusinessSchool_Rankings"], img[src*="Rankings"]');

  const cells = [];
  if (rankingImg) {
    cells.push([rankingImg]);
  }

  if (cells.length === 0) {
    element.remove();
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'ranking', cells });
  element.replaceWith(block);
}
