const tree = document.getElementById("tree");
const scene = document.getElementById("scene");

tree.style.transform = "translate(-50%, -50%) rotateY(0deg)";

const layers = 10;
const perLayer = 10;
const baseRadius = 300;
const heightStep = 35;

let imgIndex = 1;

for (let l = 0; l < layers; l++) {
  const radius = baseRadius * (1 - l / layers);
  const y = l * heightStep;

  for (let i = 0; i < perLayer; i++) {
    const img = document.createElement("img");
    img.src = `images/tree/${imgIndex}.jpg?v=1`;
    img.alt = `Christmas memory ${imgIndex}`;
    img.className = "photo";

    const angle = (360 / perLayer) * i;
    img.style.transform =
      `rotateY(${angle}deg) translateZ(${radius}px) translateY(${-y}px)`;

    tree.appendChild(img);
    imgIndex++;
  }
}

/* ===== Drag rotate ===== */
let dragging = false;
let lastX = 0;
let rotateY = 0;

scene.addEventListener("mousedown", e => {
  dragging = true;
  lastX = e.clientX;
});

scene.addEventListener("mousemove", e => {
  if (!dragging) return;
  rotateY += (e.clientX - lastX) * 0.3;
  lastX = e.clientX;
  tree.style.transform =
    `translate(-50%, -50%) rotateY(${rotateY}deg)`;
});

window.addEventListener("mouseup", () => dragging = false);
