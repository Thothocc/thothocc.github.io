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

const tree = document.getElementById("tree");
const scene = document.getElementById("scene");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");

/* ===== Tree Geometry ===== */
const layers = 9;
const perLayer = 11;
const baseRadius = 180;
const heightStep = 26;

let currentRotation = 0;
let targetRotation = 0;

/* ===== 关键修改：让树的旋转中心在屏幕正中央 ===== */
function updateTransform() {
  tree.style.transform = `rotateY(${currentRotation}deg)`;
}

/* ===== Build Tree ===== */
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
    
    /* ===== 关键修改：调整照片的位置计算 ===== */
    // 计算树的垂直中心偏移量，使树的视觉中心在屏幕中央
    const treeTotalHeight = layers * heightStep;
    const verticalCenterOffset = treeTotalHeight / 2;
    
    // 修改Y轴变换，让树的底部在中心，顶部向上延伸
    // 星星在-250px处，所以最上层应该在-250px左右
    img.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y - verticalCenterOffset + 40}px)`;
    
    /* Tap / Click */
    let downX = 0;
    img.addEventListener("touchstart", e => {
      downX = e.touches[0].clientX;
      img.classList.add("active");
    });
    
    img.addEventListener("touchend", e => {
      img.classList.remove("active");
      viewerImg.src = img.src;
      viewer.classList.add("show");
    });
    
    img.addEventListener("mousedown", e => {
      img.classList.add("active");
      e.stopPropagation();
    });
    
    img.addEventListener("mouseup", e => {
      img.classList.remove("active");
      viewerImg.src = img.src;
      viewer.classList.add("show");
      e.stopPropagation();
    });
    
    tree.appendChild(img);
    imgIndex++;
  }
}

/* ===== Close Viewer ===== */
viewer.addEventListener("click", () => {
  viewer.classList.remove("show");
});

/* ===== Rotation (Mouse + Touch) ===== */
let dragging = false;
let lastX = 0;

scene.addEventListener("mousedown", e => {
  dragging = true;
  lastX = e.clientX;
});

scene.addEventListener("mousemove", e => {
  if (!dragging) return;
  targetRotation += (e.clientX - lastX) * 0.35;
  lastX = e.clientX;
});

window.addEventListener("mouseup", () => dragging = false);

/* Touch（关键：不 passive） */
scene.addEventListener("touchstart", e => {
  dragging = true;
  lastX = e.touches[0].clientX;
});

scene.addEventListener("touchmove", e => {
  if (!dragging) return;
  targetRotation += (e.touches[0].clientX - lastX) * 0.35;
  lastX = e.touches[0].clientX;
});

scene.addEventListener("touchend", () => dragging = false);

/* ===== Animation Loop ===== */
function animate() {
  currentRotation += (targetRotation - currentRotation) * 0.08;
  updateTransform();
  requestAnimationFrame(animate);
}

// 初始位置修正
window.addEventListener('load', () => {
  // 等待所有图片加载完成
  setTimeout(() => {
    // 确保树在屏幕正中央
    tree.style.left = '50%';
    tree.style.top = '50%';
    updateTransform();
  }, 100);
});

/* ===== Snow ===== */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const flakes = Array.from({ length: 70 }, () => ({
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
