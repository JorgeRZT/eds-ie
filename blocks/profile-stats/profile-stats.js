export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // Row 1: title, Row 2: portrait image, remaining rows: [number | label] stats
  const [titleRow, imageRow, ...statRows] = rows;

  const title = titleRow.textContent.trim();
  if (title) {
    const h = document.createElement('h2');
    h.className = 'profile-stats-title';
    h.textContent = title;
    block.prepend(h);
  }
  titleRow.remove();

  const figure = document.createElement('div');
  figure.className = 'profile-stats-figure';
  const pic = imageRow.querySelector('picture, img');
  if (pic) figure.append(pic.closest('picture') || pic);

  statRows.forEach((row) => {
    const cells = [...row.children];
    const number = cells[0] ? cells[0].textContent.trim() : '';
    const label = cells[1] ? cells[1].textContent.trim() : '';
    if (number || label) {
      const bubble = document.createElement('div');
      bubble.className = 'profile-stats-bubble';
      bubble.innerHTML = `<span class="profile-stats-number">${number}</span><span class="profile-stats-label">${label}</span>`;
      figure.append(bubble);
    }
    row.remove();
  });

  imageRow.replaceWith(figure);
}
