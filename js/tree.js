const tree = document.getElementById("tree");
const scene = document.getElementById("scene");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");

/* ===== Tree Geometry ===== */
const layers = 9;
const perLayer = 11;
const baseRadius = 180;
const heightStep = 26;

tree.style.transform = "translate3d(-50%, -50%, 0) rotateY(0deg)";

/* ===== Create Tree ===== */
let imgIndex = 1;
for (let l = 0; l < layers; l++) {
  const radius = baseRadius * (1 - l / layers);
  const y = l * heightStep;

  for (let i = 0; i < perLayer; i++) {
    const img = document.createElement("img");
    img.src = `images/tree/${imgIndex}.jpg`;
    img.alt = `Christmas photo ${imgIndex}`;
    img.className = "photo";

    const angle = (360 / perLayer) * i;
    img.style.transform =
      `rotateY(${angle}deg)
       translateZ(${radius}px)
       translateY(${-y}px)
       translate3d(0,0,0)`;

    img.addEventListener("click", e => {
      e.stopPropagation();
      viewerImg.src = img.src;
      viewer.classList.remove("hidden");
    });

    tree.appendChild(img);
    imgIndex++;
  }
}

/* ===== Close Viewer ===== */
viewer.addEventListener("click", () => {
  viewer.classList.add("hidden");
});

/* ===== Rotation (Mouse + Touch, RAF) ===== */
let isDragging = false;
let lastX = 0;
let targetRotation = 0;
let currentRotation = 0;

function animate() {
  currentRotation += (targetRotation - currentRotation) * 0.08;
  tree.style.transform =
    `translate3d(-50%, -50%, 0) rotateY(${currentRotation}deg)`;
  requestAnimationFrame(animate);
}
animate();

function startDrag(x) {
  isDragging = true;
  lastX = x;
}

function moveDrag(x) {
  if (!isDragging) return;
  targetRotation += (x - lastX) * 0.35;
  lastX = x;
}

function endDrag() {
  isDragging = false;
}

/* Mouse */
scene.addEventListener("mousedown", e => startDrag(e.clientX));
scene.addEventListener("mousemove", e => moveDrag(e.clientX));
window.addEventListener("mouseup", endDrag);

/* Touch */
scene.addEventListener("touchstart", e =>
  startDrag(e.touches[0].clientX), { passive: true });
scene.addEventListener("touchmove", e =>
  moveDrag(e.touches[0].clientX), { passive: true });
scene.addEventListener("touchend", endDrag);

/* ===== Snow Effect (Canvas) ===== */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const flakes = Array.from({ length: 80 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 1,
  v: Math.random() * 0.8 + 0.4
}));

function snow() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.v;
    if (f.y > h) {
      f.y = -5;
      f.x = Math.random() * w;
    }
  });
  requestAnimationFrame(snow);
}
snow();
