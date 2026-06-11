export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // First row is the section title
  const [titleRow, ...itemRows] = rows;
  const title = titleRow.textContent.trim();
  if (title) {
    const h = document.createElement('h2');
    h.className = 'accordion-title';
    h.textContent = title;
    block.prepend(h);
  }
  titleRow.remove();

  itemRows.forEach((row) => {
    const cells = [...row.children];
    const summaryText = cells[0] ? cells[0].textContent.trim() : '';
    const bodyCell = cells[1];

    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = summaryText;
    details.append(summary);

    const body = document.createElement('div');
    body.className = 'accordion-body';
    if (bodyCell) {
      [...bodyCell.childNodes].forEach((n) => body.append(n));
    }
    details.append(body);

    row.replaceWith(details);
  });
}
