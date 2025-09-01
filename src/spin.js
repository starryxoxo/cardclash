function getOptionsFromHTML() {
  const nodes = document.querySelectorAll('.bar-option');
  return Array.from(nodes).map(node => ({
    name: node.textContent.trim(),
    chance: parseFloat(node.dataset.chance)
  }));
}

function pickResult(options) {
  const totalChance = options.reduce((sum, opt) => sum + opt.chance, 0);
  let pick = Math.random() * totalChance;
  for (const opt of options) {
    pick -= opt.chance;
    if (pick <= 0) return opt;
  }
  return options[options.length-1]; // fallback
}

document.getElementById('spinBtn').addEventListener('click', () => {
  const options = getOptionsFromHTML();
  const result = pickResult(options);
  document.getElementById('resultDisplay').textContent = `Result: ${result.name}`;
});