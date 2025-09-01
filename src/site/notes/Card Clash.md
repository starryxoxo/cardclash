---
{"dg-publish":true,"permalink":"/card-clash/","tags":["gardenEntry"]}
---

# Welcome to Card Clash.

<!-- spin.html snippet for wheel -->
<div class="spin-wheel-container">
  <div class="spin-wheel" id="spinWheel">
    <!-- Wheel slices will be injected by JS -->
  </div>
  <button id="spinBtn" class="spin-button">Spin!</button>
  <div class="result-section">
    <span id="resultDisplay" class="result-display">Spin to win a card!</span>
  </div>
</div>

<script>
// wheelOptions from previous example
const wheelOptions = [
  { name: 'Fire Card', chance: 50, display: '🔥 Fire Card', color: '#ff5e57' },
  { name: 'Water Card', chance: 30, display: '💧 Water Card', color: '#43b9f9' },
  { name: 'Ultra Rare Card', chance: 5, display: '✨ Ultra Rare!', color: '#e7b3ff' },
  { name: 'Lucky Upgrade', chance: 15, display: '🎲 Upgrade!', color: '#f9ca24' }
];

// Dynamically create wheel slices
function buildWheel(options) {
  const wheel = document.getElementById('spinWheel');
  wheel.innerHTML = '';
  const sliceCount = options.length;
  options.forEach((opt, i) => {
    const slice = document.createElement('div');
    slice.className = 'wheel-slice';
    slice.style.setProperty('--slice-color', opt.color);
    const angle = 360 * i / sliceCount;
    slice.style.transform = `rotate(${angle}deg)`;
    const label = document.createElement('div');
    label.className = 'wheel-label';
    label.textContent = opt.display;
    label.style.transform = `rotate(${angle + 360/sliceCount/2}deg) translate(-50%, -110%)`;
    wheel.appendChild(slice);
    wheel.appendChild(label);
  });
}
buildWheel(wheelOptions);

// Animate spin
document.getElementById('spinBtn').addEventListener('click', () => {
  const wheel = document.getElementById('spinWheel');
  // Randomly decide spin amount
  const spinDeg = 360 * 5 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${spinDeg}deg)`;
  // You'll want to sync this with your JS spin logic for result!
});
</script>

<style>
.spin-wheel {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  overflow: hidden;
  margin-bottom: 24px;
  transition: transform 4s cubic-bezier(.22,.68,.38,.98);
}

.wheel-slice {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform-origin: 0 100%;
  background: conic-gradient(var(--slice-color) 0 100%);
  clip-path: polygon(0% 100%, 100% 100%, 100% 0%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  pointer-events: none;
}

.wheel-label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -110%);
  font-size: 1rem;
  color: #fff;
  text-shadow: 0 2px 8px #302b63;
  pointer-events: none;
}
</script>