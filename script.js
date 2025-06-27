const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const brushSize = document.getElementById('brushSize');
const presetButtons = document.querySelectorAll('.preset');

let painting = false;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath(); // reset path
}

function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Clear canvas
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Color from preset buttons
presetButtons.forEach(button => {
  button.addEventListener('click', () => {
    const color = getComputedStyle(button).backgroundColor;
    colorPicker.value = rgbToHex(color);
  });
});

// Helper to convert rgb to hex
function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g).map(Number);
  return '#' + result.map(x => x.toString(16).padStart(2, '0')).join('');
}
