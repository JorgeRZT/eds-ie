/* eslint-disable */
/* global WebImporter */

/**
 * Parser for feature-textimg
 * Base block: columns
 * Source: https://iem-brochures.ie.edu/.executive.mba/ (pages 6 and 8)
 *
 * Page 6: paragraph text + feature student photo (ranking GIF excluded).
 * Page 8 ("La opción ideal"): short title + paragraph + photo.
 *
 * Builds a two-column layout [text | image]. The first short paragraph (no
 * sentence-ending period and < 40 chars) is promoted to an <h2> heading.
 */
export default function parse(element, { document }) {
  const textContainer = element.querySelector('[class*="Marco-de-texto"]');
  const paragraphs = (textContainer
    ? Array.from(textContainer.querySelectorAll('p'))
    : Array.from(element.querySelectorAll('p'))
  ).filter((p) => p.textContent.trim().length > 0);

  const col1 = [];
  paragraphs.forEach((p, i) => {
    const text = p.textContent.trim();
    const isTitle = i === 0 && text.length < 40 && !/[.!?]$/.test(text);
    if (isTitle) {
      const h = document.createElement('h2');
      h.textContent = text;
      col1.push(h);
    } else {
      col1.push(p);
    }
  });

  // Feature photo: any meaningful image that is not the rotating ranking GIF.
  const photo = Array.from(element.querySelectorAll('img'))
    .find((img) => !/Rankings/i.test(img.getAttribute('src') || ''));

  const col2 = photo ? [photo] : '';

  const cells = [[col1.length ? col1 : '', col2]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'feature-textimg', cells });
  element.replaceWith(block);
}
