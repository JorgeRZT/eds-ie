/**
 * Section Metadata block — reads key/value pairs from the block table
 * and applies them to the parent section element.
 * The "style" key adds CSS classes to the section.
 * @param {Element} block The section-metadata block element
 */
export default function decorate(block) {
  const section = block.closest('.section');
  if (!section) return;

  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;
    const key = cells[0].textContent.trim().toLowerCase();
    const value = cells[1].textContent.trim();

    if (key === 'style') {
      value.split(',').forEach((style) => {
        section.classList.add(style.trim().toLowerCase());
      });
    }
  });

  // Hide the section-metadata block from the page
  block.closest('.section-metadata-wrapper')?.remove();
}
