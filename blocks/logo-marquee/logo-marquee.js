export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cell = row.children.length === 1 ? row.firstElementChild : row;
    const imgs = [...cell.querySelectorAll('picture, img')];
    const link = cell.querySelector('a');
    const list = cell.querySelector('ul, ol');

    if (imgs.length > 0) {
      // logo strip — duplicate contents for a seamless loop
      const track = document.createElement('div');
      track.className = 'logo-marquee-track';
      const inner = document.createElement('div');
      inner.className = 'logo-marquee-track-inner';
      const logos = imgs.map((img) => img.closest('picture') || img);
      logos.forEach((l) => inner.append(l));
      logos.forEach((l) => inner.append(l.cloneNode(true)));
      track.append(inner);
      row.replaceWith(track);
    } else if (link) {
      const cta = document.createElement('div');
      cta.className = 'logo-marquee-cta';
      cta.append(link);
      row.replaceWith(cta);
    } else if (list) {
      list.classList.add('logo-marquee-list');
      row.replaceWith(list);
    } else {
      // text rows: first becomes eyebrow, the rest a note
      const p = cell.querySelector('p') || cell;
      p.classList.add(block.querySelector('.logo-marquee-eyebrow') ? 'logo-marquee-note' : 'logo-marquee-eyebrow');
      row.replaceWith(p);
    }
  });
}
