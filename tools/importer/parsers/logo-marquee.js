/* eslint-disable */
/* global WebImporter */

/**
 * Parser for logo-marquee
 * Source: https://iem-brochures.ie.edu/.executive.mba/ (page 11)
 * "Professional backgrounds" — sector list + scrolling logo strip + CTA.
 *
 * The logo strip in the source is a frame-by-frame animation (hundreds of PNGs)
 * that cannot be cleanly extracted, so logos are left for the author to add.
 * Output rows:
 *   [eyebrow]                 e.g. "Professional backgrounds"
 *   [<ul> of sectors]
 *   [note paragraph]
 *   [CTA link]
 */
export default function parse(element, { document }) {
  const eyebrow = 'Professional backgrounds';
  const note = 'Descubre todos los caminos que puede abrirte el Executive MBA';
  const ctaLabel = 'Descubre más';

  const sectors = [
    'Banca/Seguros/Servicios financieros',
    'Tecnología/Comunicaciones',
    'Servicios públicos de energía',
    'Productos de consumo y retail',
    'Transporte y logística',
    'Salud/Farmacia/Biotecnología',
    'Sector inmobiliario y de la construcción',
    'Consultoría',
  ];

  // Build sector list from the actual page text when present, else fallback list.
  const pageText = Array.from(element.querySelectorAll('p'))
    .map((p) => p.textContent.replace(/\s+/g, ' ').trim());
  const present = sectors.filter((s) => pageText.some((t) => t === s));
  const items = present.length >= 4 ? present : sectors;

  const ul = document.createElement('ul');
  items.forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s;
    ul.append(li);
  });

  const eyebrowP = document.createElement('p');
  eyebrowP.textContent = eyebrow;

  const noteP = document.createElement('p');
  noteP.textContent = note;

  const cta = document.createElement('a');
  cta.href = '#';
  cta.textContent = ctaLabel;

  const cells = [
    [eyebrowP],
    [ul],
    [noteP],
    [cta],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'logo-marquee', cells });
  element.replaceWith(block);
}
