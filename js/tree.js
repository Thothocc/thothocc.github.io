// tree.js

const tree = document.getElementById("tree");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const images = [];
for (let i = 1; i <= 99; i++) images.push(`images/tree/${i}.jpg`);

let index = 0;

// 层结构（重新分配半径，避免底层过宽）
const layers = [
  { n:3, r:50 },
  { n:5, r:70 },
  { n:6, r:85 },
  { n:8, r:100 },
  { n:8, r:115 },
  { n:9, r:130 },
  { n:9, r:145 },
  { n:11, r:160 },
  { n:11, r:175 },
  { n:12, r:190 },
  { n:13, r:205 },
  { n:13, r:220 }
];

// 屏幕高度和安全区
const H = window.innerHeight;
const W = window.innerWidth;

const treeTop = 0.25 * H;    // 星星顶部稍微留空 25%
const treeBottom = 0.75 * H; // 树底距离底部 25%
const treeHeight = treeBottom - treeTop;

// 生成圣诞树
layers.forEach((layer, i) => {
  // 每层 Y 坐标均匀分布
  const y = treeTop + i * (treeHeight / (layers.length - 1));
  for (let j = 0; j < layer.n; j++) {
    if (!images[index]) break;
    const angle = (360 / layer.n) * j;

    const img = document.createElement("img");
    img.src = images[index++];
    img.className = "leaf";

    // 调整 transform 顺序和缩放，保证层间空隙合理
    img.style.transform = `
      rotateY(${angle}deg)
      translateZ(${layer.r}px)
      translateY(${y}px)
      scale(0.9)
    `;

    // 点击放大
    img.addEventListener("click", e => {
      viewerImg.src = img.src;
      viewer.classList.add("show");
    });

    tree.appendChild(img);
  }
});

// viewer 点击关闭
viewer.addEventListener("click", ()=> viewer.classList.remove("show"));

// 拖拽旋转
let rotY = 0, isDown = false, lastX = 0;
document.addEventListener("pointerdown", e => { isDown = true; lastX = e.clientX; });
document.addEventListener("pointermove", e => {
  if(!isDown) return;
  rotY += (e.clientX - lastX) * 0.3;
  tree.style.transform = `rotateY(${rotY}deg)`;
  lastX = e.clientX;
});
document.addEventListener("pointerup", ()=>isDown=false);

// 雪花 Canvas
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let w,h;
function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
resize();
window.addEventListener("resize", resize);
const flakes = Array.from({length:70},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+1,v:Math.random()*0.8+0.4}));
function snow(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="rgba(255,255,255,0.8)";
  flakes.forEach(f=>{
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill();
    f.y+=f.v;
    if(f.y>h){ f.y=-5; f.x=Math.random()*w; }
  });
  requestAnimationFrame(snow);
}
snow();
