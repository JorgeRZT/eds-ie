export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // Row 1: title | caption
  // Row 2: media (image/video) | intro paragraph
  // Row 3+: timeline steps -> [period | role/company]
  const [headRow, mediaRow, ...stepRows] = rows;

  const headCells = [...headRow.children];
  const title = headCells[0] ? headCells[0].textContent.trim() : '';
  const caption = headCells[1] ? headCells[1] : null;
  if (title) {
    const h = document.createElement('h2');
    h.className = 'alumni-story-title';
    h.textContent = title;
    block.prepend(h);
  }
  headRow.remove();

  const mediaCells = [...mediaRow.children];
  const media = document.createElement('div');
  media.className = 'alumni-story-media';
  const videoLink = mediaCells[0]
    ? mediaCells[0].querySelector('a[href$=".mp4"]')
    : null;
  const pic = mediaCells[0] ? mediaCells[0].querySelector('picture, img') : null;
  if (videoLink) {
    const video = document.createElement('video');
    video.src = videoLink.getAttribute('href');
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;
    media.append(video);
  } else if (pic) {
    media.append(pic.closest('picture') || pic);
  }

  const intro = document.createElement('p');
  intro.className = 'alumni-story-intro';
  if (mediaCells[1]) intro.textContent = mediaCells[1].textContent.trim();
  mediaRow.replaceWith(media);

  if (caption) {
    const cap = document.createElement('p');
    cap.className = 'alumni-story-caption';
    const innerP = caption.querySelector('p');
    cap.innerHTML = innerP ? innerP.innerHTML : caption.innerHTML;
    media.after(cap);
  }
  media.after(intro);

  const timeline = document.createElement('div');
  timeline.className = 'alumni-story-timeline';
  stepRows.forEach((row) => {
    const ps = [...row.querySelectorAll('p')];
    if (!ps.length && !row.textContent.trim()) return;
    const step = document.createElement('div');
    step.className = 'alumni-story-step';
    const period = document.createElement('p');
    period.className = 'alumni-story-period';
    period.textContent = ps[0] ? ps[0].textContent.trim() : '';
    step.append(period);
    ps.slice(1).forEach((p, i) => {
      const line = document.createElement('p');
      if (i === 0) line.className = 'alumni-story-role';
      line.textContent = p.textContent.trim();
      step.append(line);
    });
    timeline.append(step);
  });
  block.append(timeline);
  stepRows.forEach((r) => r.remove());
}
