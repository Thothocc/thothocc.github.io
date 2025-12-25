const cover = document.getElementById("cover");
const scene = document.getElementById("scene");
const tree = document.getElementById("tree");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");

/* ===== Enter ===== */
cover.addEventListener("click", () => {
  cover.classList.add("hidden");
  scene.classList.remove("hidden");

  initTree();
});

/* ===== Create Tree ===== */
function initTree() {
  tree.innerHTML = "";
  tree.style.transform = "translate(-50%, -50%) rotateY(0deg)";

  const layers = 10;
  const perLayer = 10;
  const baseRadius = 320;
  const heightStep = 38;

  let imgIndex = 1;

  for (let l = 0; l < layers; l++) {
    const radius = baseRadius * (1 - l / layers);
    const y = l * heightStep;

    for (let i = 0; i < perLayer; i++) {
      const angle = (360 / perLayer) * i;
      const img = document.createElement("img");

      img.src = `images/tree/${imgIndex}.jpg`;
      img.className = "photo";

      img.style.transform = `
        rotateY(${angle}deg)
        translateZ(${radius}px)
        translateY(${-y}px)
      `;

      img.addEventListener("click", e => {
        e.stopPropagation();
        viewerImg.src = img.src;
        viewer.classList.remove("hidden");
      });

      tree.appendChild(img);
      imgIndex++;
    }
  }
}

/* ===== Drag Rotate ===== */
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
  tree.style.transform = `translate(-50%, -50%) rotateY(${rotateY}deg)`;
});

window.addEventListener("mouseup", () => dragging = false);

/* ===== Close Viewer ===== */
viewer.addEventListener("click", () => {
  viewer.classList.add("hidden");
});
