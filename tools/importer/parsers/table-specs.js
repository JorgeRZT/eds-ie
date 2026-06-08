/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-specs
 * Base block: table
 * Source: InDesign/EPUB brochure page with specifications content rendered as images
 * Generated: 2026-06-05
 *
 * Source HTML is an InDesign export where specification data is rendered as images
 * rather than structured HTML tables. The parser extracts the page background image
 * (which contains the full visual specification layout) and heading text,
 * organizing them into a Table block structure.
 *
 * Each spec page is captured as a single image row, preserving the designed layout.
 */
export default function parse(element, { document }) {
  // Extract the heading text from the text frame container (class "Marco-de-texto-b-sico")
  const textFrame = element.querySelector('.Marco-de-texto-b-sico');
  const headingEl = textFrame ? textFrame.querySelector('p') : null;

  // Extract the main page/background image - this is the first img directly inside
  // the top-level _idContainer div, representing the full spec page layout
  const topContainer = element.querySelector(':scope > div > div[id^="_idContainer"]');
  const pageImages = topContainer ? topContainer.querySelectorAll(':scope > div[id^="_idContainer"] > img, :scope > img') : [];

  // Find the primary background image (the first large img that represents the page)
  let backgroundImg = null;
  if (topContainer) {
    // The first direct img child of the top container is the page background
    backgroundImg = topContainer.querySelector(':scope > img');
  }

  // Build cells to match Table block structure:
  // The Table block expects: header row, then data rows
  // For this InDesign export: we use the heading as header, and the page image as content
  const cells = [];

  // Header row: the section heading if present
  if (headingEl) {
    const headingText = headingEl.textContent.trim();
    if (headingText) {
      cells.push([headingEl]);
    }
  }

  // Content row: the background image captures the full visual spec table
  if (backgroundImg) {
    cells.push([backgroundImg]);
  }

  // If no background image found, try to find the first significant image
  // (handles variation where structure differs slightly between pages)
  if (!backgroundImg) {
    const firstImg = element.querySelector('img[src]');
    if (firstImg) {
      cells.push([firstImg]);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-specs', cells });
  element.replaceWith(block);
}
