// const tree = document.getElementById("tree");
// const scene = document.getElementById("scene");
// const viewer = document.getElementById("viewer");
// const viewerImg = document.getElementById("viewer-img");

// /* ===== Tree Geometry ===== */
// const layers = 9;
// const perLayer = 11;
// const baseRadius = 180;
// const heightStep = 26;

// /* 整体下移 40px，居中 */
// let currentRotation = 0;
// let targetRotation = 0;

// function updateTransform() {
//   tree.style.transform =
//     `translate3d(-50%, calc(-50%), 0) rotateY(${currentRotation}deg)`;
// }

// /* ===== Build Tree ===== */
// let imgIndex = 1;
// for (let l = 0; l < layers; l++) {
//   const radius = baseRadius * (1 - l / layers);
//   const y = l * heightStep;

//   for (let i = 0; i < perLayer; i++) {
//     const img = document.createElement("img");
//     img.src = `images/tree/${imgIndex}.jpg`;
//     img.alt = `Christmas photo ${imgIndex}`;
//     img.className = "photo";

//     const angle = (360 / perLayer) * i;
//     img.style.transform =
//       `rotateY(${angle}deg)
//        translateZ(${radius}px)
//        translateY(${-y}px)`;

//     /* Tap / Click */
//     let downX = 0;
//     img.addEventListener("touchstart", e => {
//       downX = e.touches[0].clientX;
//       img.classList.add("active");
//     });

//     img.addEventListener("touchend", e => {
//       img.classList.remove("active");
//       viewerImg.src = img.src;
//       viewer.classList.add("show");
//     });

//     img.addEventListener("mousedown", e => {
//       img.classList.add("active");
//       e.stopPropagation();
//     });

//     img.addEventListener("mouseup", e => {
//       img.classList.remove("active");
//       viewerImg.src = img.src;
//       viewer.classList.add("show");
//       e.stopPropagation();
//     });

//     tree.appendChild(img);
//     imgIndex++;
//   }
// }

// /* ===== Close Viewer ===== */
// viewer.addEventListener("click", () => {
//   viewer.classList.remove("show");
// });

// /* ===== Rotation (Mouse + Touch) ===== */
// let dragging = false;
// let lastX = 0;

// scene.addEventListener("mousedown", e => {
//   dragging = true;
//   lastX = e.clientX;
// });

// scene.addEventListener("mousemove", e => {
//   if (!dragging) return;
//   targetRotation += (e.clientX - lastX) * 0.35;
//   lastX = e.clientX;
// });

// window.addEventListener("mouseup", () => dragging = false);

// /* Touch（关键：不 passive） */
// scene.addEventListener("touchstart", e => {
//   dragging = true;
//   lastX = e.touches[0].clientX;
// });

// scene.addEventListener("touchmove", e => {
//   if (!dragging) return;
//   targetRotation += (e.touches[0].clientX - lastX) * 0.35;
//   lastX = e.touches[0].clientX;
// });

// scene.addEventListener("touchend", () => dragging = false);

// /* ===== Animation Loop ===== */
// function animate() {
//   currentRotation += (targetRotation - currentRotation) * 0.08;
//   updateTransform();
//   requestAnimationFrame(animate);
// }
// updateTransform();
// animate();

// /* ===== Snow ===== */
// const canvas = document.getElementById("snow");
// const ctx = canvas.getContext("2d");
// let w, h;

// function resize() {
//   w = canvas.width = window.innerWidth;
//   h = canvas.height = window.innerHeight;
// }
// resize();
// window.addEventListener("resize", resize);

// const flakes = Array.from({ length: 70 }, () => ({
//   x: Math.random() * w,
//   y: Math.random() * h,
//   r: Math.random() * 2 + 1,
//   v: Math.random() * 0.8 + 0.4
// }));

// function snow() {
//   ctx.clearRect(0, 0, w, h);
//   ctx.fillStyle = "rgba(255,255,255,0.8)";
//   flakes.forEach(f => {
//     ctx.beginPath();
//     ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
//     ctx.fill();
//     f.y += f.v;
//     if (f.y > h) {
//       f.y = -5;
//       f.x = Math.random() * w;
//     }
//   });
//   requestAnimationFrame(snow);
// }
// snow();

// const tree = document.getElementById("tree");
// const viewer = document.getElementById("viewer");
// const viewerImg = document.getElementById("viewer-img");

// /* ===== 参数 ===== */
// const layers = 9;
// const photosPerLayer = 11;
// const maxRadius = 160;
// const layerGap = 28;

// let imgIndex = 1;

// /* ===== 构建树 ===== */
// for (let l = 0; l < layers; l++) {
//   const radius = maxRadius * (1 - l / layers);
//   const y = -l * layerGap; // 只向下，绝不反转

//   for (let i = 0; i < photosPerLayer; i++) {
//     const img = document.createElement("img");
//     img.src = `images/tree/${imgIndex}.jpg`;
//     img.className = "photo";

//     const angle = (360 / photosPerLayer) * i;

//     img.style.transform = `
//       translateX(-50%)
//       translateY(${y}px)
//       rotateY(${angle}deg)
//       translateZ(${radius}px)
//     `;

//     img.onclick = e => {
//       viewerImg.src = img.src;
//       viewer.classList.add("show");
//       e.stopPropagation();
//     };

//     tree.appendChild(img);
//     imgIndex++;
//   }
// }

// /* ===== 查看器关闭 ===== */
// viewer.onclick = () => viewer.classList.remove("show");

// /* ===== 旋转控制 ===== */
// let rotation = 0;
// let target = 0;
// let dragging = false;
// let lastX = 0;

// document.addEventListener("pointerdown", e => {
//   dragging = true;
//   lastX = e.clientX;
// });

// document.addEventListener("pointermove", e => {
//   if (!dragging) return;
//   target += (e.clientX - lastX) * 0.4;
//   lastX = e.clientX;
// });

// document.addEventListener("pointerup", () => dragging = false);

// /* ===== 动画 ===== */
// function animate() {
//   rotation += (target - rotation) * 0.08;
//   tree.style.transform = `translateX(-50%) rotateY(${rotation}deg)`;
//   requestAnimationFrame(animate);
// }
// animate();

/* ===== 3D 圣诞树 JS ===== */

const tree = document.getElementById("tree");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

/* ===== 参数 ===== */
const layers = 9;               // 树层数
const photosPerLayer = 11;      // 每层照片数（均匀）
const maxRadius = 160;          // 最底层半径
const layerGap = 28;            // 层间距
const TREE_Y_OFFSET = 80;       // 整体下移，控制树高度
const totalPhotos = 99;         // 总共上传的照片数量

let imgIndex = 1;

/* ===== 构建圣诞树 ===== */
for (let l = 0; l < layers; l++) {
  const radius = maxRadius * (1 - l / layers);   // 上层半径逐渐缩小
  const y = -l * layerGap;                        // 向上生长

  // 当前层照片数量（底层多，顶层少）
  const photosInThisLayer = Math.min(photosPerLayer + l, totalPhotos - imgIndex + 1);

  for (let i = 0; i < photosInThisLayer; i++) {
    if (imgIndex > totalPhotos) break;

    const img = document.createElement("img");
    img.src = `images/tree/${imgIndex}.jpg`;
    img.alt = `Christmas photo ${imgIndex}`;
    img.className = "photo";

    const angle = (360 / photosInThisLayer) * i;

    img.style.transform = `
      rotateY(${angle}deg)
      translateZ(${radius}px)
      translateY(${y + TREE_Y_OFFSET}px)
      translateX(-50%)
    `;

    // 点击放大查看
    img.addEventListener("click", (e) => {
      viewerImg.src = img.src;
      viewer.classList.add("show");
      e.stopPropagation();
    });

    tree.appendChild(img);
    imgIndex++;
  }
}

/* ===== 点击关闭查看器 ===== */
viewer.addEventListener("click", () => {
  viewer.classList.remove("show");
});

/* ===== 树旋转控制 ===== */
let rotation = 0;
let targetRotation = 0;
let dragging = false;
let lastX = 0;

document.addEventListener("pointerdown", e => {
  dragging = true;
  lastX = e.clientX;
});

document.addEventListener("pointermove", e => {
  if (!dragging) return;
  targetRotation += (e.clientX - lastX) * 0.4;
  lastX = e.clientX;
});

document.addEventListener("pointerup", () => dragging = false);

/* ===== 动画 ===== */
function animate() {
  rotation += (targetRotation - rotation) * 0.08;
  tree.style.transform = `rotateY(${rotation}deg)`;
  requestAnimationFrame(animate);
}
animate();

/* ===== 雪花特效 ===== */
let w, h;
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const flakes = Array.from({ length: 90 }, () => ({
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

