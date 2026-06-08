export default function decorate(block) {
  const link = block.querySelector('a[href$=".mp4"]');
  if (link) {
    const video = document.createElement('video');
    video.src = link.href;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('playsinline', '');
    const row = link.closest('div');
    row.replaceWith(video);
  }
}
