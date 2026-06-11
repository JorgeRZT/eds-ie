export default function decorate(block) {
  const pics = [...block.querySelectorAll('picture')];
  pics.forEach((pic, i) => {
    const wrapper = pic.closest('div');
    if (!wrapper) return;
    wrapper.classList.add('ranking-media');
    if (i === pics.length - 1 && pics.length > 1) {
      wrapper.classList.add('ranking-photo');
    }
  });
}
