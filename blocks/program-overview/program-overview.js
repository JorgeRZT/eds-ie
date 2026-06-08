export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (rows.length < 2) return;

  const headerRow = rows[0];
  headerRow.classList.add('program-overview-header');

  const contentRow = rows[1];
  contentRow.classList.add('program-overview-content');

  const cells = [...contentRow.querySelectorAll(':scope > div')];
  if (cells[0]) cells[0].classList.add('program-overview-image');
  if (cells[1]) cells[1].classList.add('program-overview-specs');
}
