---
{"dg-publish":true,"permalink":"/card-clash/","tags":["gardenEntry"]}
---

# Welcome to Card Clash.

<div class="spin-wheel-container">
  <div class="spin-wheel-border">
    <div class="spin-wheel" id="spinWheel"></div>
    <div class="wheel-pointer"></div>
  </div>
  <button id="spinBtn" class="spin-button">Spin!</button>
  <div class="result-section">
    <span id="resultDisplay" class="result-display">Spin to win a card!</span>
  </div>
</div>

<style>
.spin-wheel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: linear-gradient(120deg, #24243e 0%, #302b63 50%, #0f0c29 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  padding: 40px 20px;
}

.spin-wheel-border {
  position: relative;
  width: 240px;
  height: 240px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 8px solid #5533ff;
  border-radius: 50%;
  background: #fff;
}

.spin-wheel {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 3s cubic-bezier(.22,.68,.38,.98);
}

.wheel-slice {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  clip-path: polygon(50% 50%, 100% 0, 100% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wheel-label {
  position: absolute;
  width: 80px;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  font-size: 1rem;
  color: #fff;
  text-shadow: 0 2px 8px #302b63;
  pointer-events: none;
  font-weight: bold;
  text-align: left;
}

.wheel-pointer {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 24px solid #f9ca24;
  z-index: 2;
}

.spin-button {
  margin-top: 10px;
  padding: 10px 32px;
  font-size: 1.2rem;
  font-weight: 600;
  background: #5533ff;
  color: #fff;
  border: none;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: background 0.2s;
}
.spin-button:hover {
  background: #7755ff;
}

.result-section {
  margin-top: 28px;
  text-align: center;
}

.result-display {
  font-size: 1.3rem;
  font-weight: 700;
  color: #f9ca24;
  text-shadow: 0 2px 8px #302b63;
  letter-spacing: 1px;
}
</style>

<script>
// wheelOptions for demo
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
  const sliceAngle = 360 / sliceCount;
  options.forEach((opt, i) => {
    // Slice
    const slice = document.createElement('div');
    slice.className = 'wheel-slice';
    slice.style.background = opt.color;
    slice.style.transform = `rotate(${i * sliceAngle}deg) skewY(${90 - sliceAngle}deg)`;
    wheel.appendChild(slice);

    // Label
    const label = document.createElement('div');
    label.className = 'wheel-label';
    label.textContent = opt.display;
    // Place the label at the edge, rotated so it's readable
    const angle = i * sliceAngle + sliceAngle / 2;
    label.style.transform = `
      rotate(${angle}deg)
      translate(70px, -10px)
      rotate(${-angle}deg)
    `;
    wheel.appendChild(label);
  });
}

// Spin logic
let spinning = false;
document.getElementById('spinBtn').addEventListener('click', () => {
  if (spinning) return;
  spinning = true;

  // Pick result based on chance
  const totalChance = wheelOptions.reduce((sum, opt) => sum + opt.chance, 0);
  let pick = Math.random() * totalChance;
  let resultIdx = 0;
  for (let i = 0; i < wheelOptions.length; i++) {
    pick -= wheelOptions[i].chance;
    if (pick <= 0) {
      resultIdx = i;
      break;
    }
  }

  // Spin animation: rotate to result
  const sliceCount = wheelOptions.length;
  const sliceAngle = 360 / sliceCount;
  const endDeg = 360 * 5 + (360 - resultIdx * sliceAngle - sliceAngle / 2); // 5 rounds then land
  const wheel = document.getElementById('spinWheel');
  wheel.style.transition = 'transform 3s cubic-bezier(.22,.68,.38,.98)';
  wheel.style.transform = `rotate(${endDeg}deg)`;

  setTimeout(() => {
    document.getElementById('resultDisplay').textContent = wheelOptions[resultIdx].display;
    spinning = false;
    wheel.style.transition = '';
    wheel.style.transform = `rotate(${(360 - resultIdx * sliceAngle - sliceAngle / 2) % 360}deg)`;
  }, 3000);
})
</script>