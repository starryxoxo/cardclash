// Improved story progression script

const lines = Array.from(document.querySelectorAll('.story-line'));
const continueBtn = document.getElementById('continueBtn');
let progress = parseInt(localStorage.getItem('storyProgress') || "0", 10);
let busy = false; // Prevent double-taps

function showLine(index) {
  if (index < 0 || index >= lines.length) return;
  const line = lines[index];
  line.style.display = 'block';
  // Use CSS for handling opacity transition
  setTimeout(() => {
    line.classList.add('visible');
    line.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 10);
}

function updateUI() {
  // Hide all lines
  lines.forEach((line, i) => {
    if (i <= progress) {
      line.style.display = 'block';
      line.classList.add('visible');
    } else {
      line.style.display = 'none';
      line.classList.remove('visible');
    }
  });
  // Hide button if at end
  if (progress >= lines.length - 1) {
    continueBtn.style.display = "none";
  } else {
    continueBtn.style.display = "block";
  }
}

function tapContinue() {
  if (busy) return;
  busy = true;
  progress++;
  if (progress >= lines.length) progress = lines.length - 1;
  localStorage.setItem('storyProgress', progress);
  showLine(progress);
  updateUI();
  setTimeout(() => { busy = false; }, 500); // allow time for animation
}

// Initial state: show up to current progress
updateUI();

// Event listener
continueBtn.addEventListener('click', tapContinue);
