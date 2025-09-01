---
{"dg-publish":true,"permalink":"/card-clash/","tags":["gardenEntry"]}
---

# Welcome to Card Clash.

<div class="spin-wheel-container">
  <div class="wheel">
    <div id="wheelCanvas"></div>
    <button id="spinBtn" class="spin-button">Spin!</button>
  </div>
  <div class="result-section">
    <span id="resultDisplay" class="result-display">Spin to win a card!</span>
  </div>
</div>

<script>
// spin.js
class SpinWheel {
    constructor(options) {
        // Each option: { name, chance, display }
        this.options = options;
        this.inventory = null; // To be set by inventory.js
    }

    setInventory(inventory) {
        this.inventory = inventory;
    }

    spin() {
        const totalChance = this.options.reduce((sum, opt) => sum + opt.chance, 0);
        let pick = Math.random() * totalChance;
        for (const opt of this.options) {
            pick -= opt.chance;
            if (pick <= 0) {
                this.addToInventory(opt.name);
                return opt;
            }
        }
        // fallback (shouldn't reach here)
        return this.options[this.options.length - 1];
    }

    addToInventory(itemName) {
        if (this.inventory) {
            this.inventory.addItem(itemName);
        }
    }
}

// Example usage:
const wheelOptions = [
    { name: 'Fire Card', chance: 50, display: '🔥 Fire Card' },
    { name: 'Water Card', chance: 30, display: '💧 Water Card' },
    { name: 'Ultra Rare Card', chance: 5, display: '✨ Ultra Rare!' },
    { name: 'Lucky Upgrade', chance: 15, display: '🎲 Upgrade!' }
];

const spinWheel = new SpinWheel(wheelOptions);

// UI hook (example)
document.getElementById('spinBtn').addEventListener('click', () => {
    const result = spinWheel.spin();
    document.getElementById('resultDisplay').textContent = result.display;
});
</script>

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

.wheel {
  position: relative;
  width: 250px;
  height: 250px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#wheelCanvas {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: #fff9e6;
  border: 6px solid #5533ff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.spin-button {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
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

/* Responsive for mobile */
@media (max-width: 600px) {
  .spin-wheel-container {
    min-height: 250px;
    padding: 20px 5px;
  }
  .wheel {
    width: 180px;
    height: 180px;
  }
  #wheelCanvas {
    width: 150px;
    height: 150px;
    font-size: 1rem;
  }
  .spin-button {
    padding: 8px 18px;
    font-size: 1rem;
    bottom: -30px;
  }
}
</style>