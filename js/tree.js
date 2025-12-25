const cover = document.getElementById("cover");
const scene = document.getElementById("scene");
const tree = document.getElementById("tree");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");

cover.onclick = () => {
  cover.classList.add("hidden");
  scene.classList.remove("hidden");
  createTree();
};

function createTree() {
  const layers = 10;
  const perLayer = 10;
  const baseRadius = 300;
  const heightStep = 40;
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

      img.onclick = (e) => {
        e.stopPropagation();
        viewerImg.src = img.src;
        viewer.classList.remove("hidden");
      };

      tree.appendChild(img);
      imgIndex++;
    }
  }
}

/* ===== Drag rotate ===== */
let isDown = false;
let startX = 0;
let rotateY = 0;

scene.onmousedown = e => {
  isDown = true;
  startX = e.clientX;
};

scene.onmousemove = e => {
  if (!isDown) return;
  rotateY += (e.clientX - startX) * 0.3;
  startX = e.clientX;
  tree.style.transform = `translate(-50%, -50%) rotateY(${rotateY}deg)`;
};

scene.onmouseup = () => isDown = false;

/* ===== Close viewer ===== */
viewer.onclick = () => viewer.classList.add("hidden");
