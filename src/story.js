<script>
const lines = Array.from(document.querySelectorAll('.story-line'));
let progress = parseInt(localStorage.getItem('storyProgress') || "0", 10);

function showLine(index) {
  if (index >= lines.length) {
    document.getElementById('continueBtn').style.display = "none";
    return;
  }
  const line = lines[index];
  line.style.display = 'block';
  line.style.opacity = '0';
  line.style.transition = `opacity ${line.dataset.fade || '1s'} ease`;
  // Use CSS variable for transition if you want
  line.style.setProperty('--fade', line.dataset.fade || '1s');
  setTimeout(() => {
    line.classList.add('visible');
    line.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 50);
  document.getElementById('continueBtn').style.display = "block"; // Always show unless finished
}

function tapContinue() {
  progress++;
  localStorage.setItem('storyProgress', progress);
  showLine(progress);
}

lines.forEach(line => line.style.display = 'none'); // Hide all initially
for (let i = 0; i <= progress && i < lines.length; i++) showLine(i);

document.getElementById('continueBtn').addEventListener('click', tapContinue);
</script>
