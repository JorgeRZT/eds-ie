export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const cols = [...row.children];
  cols.forEach((col) => {
    const pic = col.querySelector('picture');
    if (pic && col.children.length === 1 && col.firstElementChild === pic.closest('p, div, picture')) {
      col.classList.add('feature-textimg-img-col');
    } else if (pic) {
      col.classList.add('feature-textimg-img-col');
    } else {
      col.classList.add('feature-textimg-text-col');
    }
  });
}
