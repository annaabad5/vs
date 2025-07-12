let buildings = [];
let jobsLost = 0;
let maxJobsLost = 255000000;
let startAnimation = false;
let smokeParticles = [];
let observerStarted = false;

let months = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function setup() {
  let canvas = createCanvas(windowWidth, 600);
  canvas.parent("canvas-ciudad");
  noStroke();
  textFont("Inter");

  for (let i = 0; i < 40; i++) {
    let w = random(30, 60);
    let h = random(100, 220);
    let x = random(20, width - 100);
    let y = 400;
    let depth = random(0.5, 1);
    let windows = [];

    for (let r = 0; r < int(h / 30); r++) {
      for (let c = 0; c < int(w / 20); c++) {
        windows.push({
          x: x + 5 + c * 15,
          y: y - 10 - r * 20,
          on: true,
        });
      }
    }

    let isFactory = random() < 0.25;
    buildings.push({ x, y, w, h, depth, windows, isFactory });
  }

  buildings.sort((a, b) => a.depth - b.depth);

  if (!observerStarted) {
    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          startAnimation = true;
        }
      }, {
        threshold: 0.5 // 👉 activa cuando el 50% del canvas está visible
      });
      
    let target = document.querySelector("#canvas-ciudad");
    if (target) {
      observer.observe(target);
      observerStarted = true;
    }
  }
}

function draw() {
  let progress = jobsLost / maxJobsLost;
  background(255); // Fondo blanco fijo

  // Avance de empleos perdidos
  if (startAnimation && jobsLost < maxJobsLost) {
    jobsLost += 400000;
  }

  // Probabilidad de que se apague una ventana
  let windowOffChance = map(progress, 0, 1, 0.001, 0.02);
  let smokeIntensity = map(progress, 0, 1, 1, 0);

  // Dibujar edificios
  for (let b of buildings) {
    fill(lerpColor(color(60), color(100), b.depth));
    rect(b.x, b.y, b.w, -b.h);

    for (let win of b.windows) {
      if (startAnimation && random() < windowOffChance) {
        win.on = false;
      }
      fill(win.on ? "#FFD700" : "#FFFFFF");  // Ventanas apagadas blancas
      rect(win.x, win.y, 10, 10);
    }

    if (b.isFactory) {
      fill(50);
      rect(b.x + b.w - 10, b.y - b.h - 20, 10, 20);

      if (startAnimation && random() < 0.1 * smokeIntensity) {
        smokeParticles.push({
          x: b.x + b.w - 5,
          y: b.y - b.h - 20,
          r: random(6, 10),
          alpha: 180,
          speed: random(0.5, 1)
        });
      }
    }
  }

  // Dibujar humo
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    let p = smokeParticles[i];
    fill(100, p.alpha);
    ellipse(p.x, p.y, p.r);
    p.y -= p.speed;
    p.alpha -= 1.5;
    if (p.alpha < 10) {
      smokeParticles.splice(i, 1);
    }
  }

  drawTimeline();
}

function drawTimeline() {
  let currentMonthIndex = floor(map(jobsLost, 0, maxJobsLost, 0, 12));
  currentMonthIndex = constrain(currentMonthIndex, 0, 11);

  stroke(100);
  line(50, 500, width - 50, 500);
  noStroke();

  for (let i = 0; i < months.length; i++) {
    let x = map(i, 0, 11, 50, width - 50);
    fill(i === currentMonthIndex ? "#D87B3D" : 50);
    textSize(i === currentMonthIndex ? 16 : 12);
    textAlign(CENTER);
    text(months[i], x, 520);
  }

  let pointerX = map(currentMonthIndex, 0, 11, 50, width - 50);
  fill("#D87B3D");
  triangle(pointerX, 490, pointerX - 5, 480, pointerX + 5, 480);
}

function windowResized() {
  resizeCanvas(windowWidth, 600);
}
