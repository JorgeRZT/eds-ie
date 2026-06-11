export default function decorate(block) {
  const chevrons = document.createElement('div');
  chevrons.className = 'highlight-text-chevrons';
  for (let i = 0; i < 3; i += 1) {
    chevrons.appendChild(document.createElement('span'));
  }
  block.append(chevrons);
}
