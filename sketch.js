let slices = 8;

function setup() {
  createCanvas(900, 600);
  noLoop();
  drawPizzas();
}

function updateSlices() {
  slices = int(document.getElementById("sliceInput").value);
  clear();
  background(255);
  drawPizzas();
}

function drawPizzas() {
  background('#fffde7');

  let centers = [
    { x: 225, y: 200, label: "Punto-Pendiente 🔴" },
    { x: 675, y: 200, label: "DDA 🟢" },
    { x: 225, y: 500, label: "Bresenham 🔵" },
    { x: 675, y: 500, label: "p5.js line() ⚫" },
  ];

  for (let i = 0; i < centers.length; i++) {
    drawPizza(centers[i].x, centers[i].y, 100, slices, centers[i].label, i);
  }
}

function drawPizza(cx, cy, r, numSlices, label, methodIndex) {
  stroke(0);
  noFill();
  circle(cx, cy, r * 2);
  fill(0);
  noStroke();
  textAlign(CENTER);
  text(label, cx, cy + r + 20);

  for (let i = 0; i < numSlices; i++) {
    let angle = TWO_PI * i / numSlices;
    let x1 = cx;
    let y1 = cy;
    let x2 = cx + r * cos(angle);
    let y2 = cy + r * sin(angle);

    switch (methodIndex) {
      case 0:
        pointSlopeLine(x1, y1, x2, y2);
        break;
      case 1:
        ddaLine(x1, y1, x2, y2);
        break;
      case 2:
        bresenhamLine(x1, y1, x2, y2);
        break;
      case 3:
        stroke(0);
        line(x1, y1, x2, y2);
        break;
    }
  }
}

// Método 1: Punto-Pendiente
function pointSlopeLine(x0, y0, x1, y1) {
  stroke('red');
  let dx = x1 - x0;
  let dy = y1 - y0;

  if (abs(dx) > abs(dy)) {
    let m = dy / dx;
    let b = y0 - m * x0;
    let startX = x0 < x1 ? x0 : x1;
    let endX = x0 > x1 ? x0 : x1;

    for (let x = startX; x <= endX; x++) {
      let y = m * x + b;
      point(x, y);
    }
  } else {
    let mInv = dx / dy;
    let b = x0 - mInv * y0;
    let startY = y0 < y1 ? y0 : y1;
    let endY = y0 > y1 ? y0 : y1;

    for (let y = startY; y <= endY; y++) {
      let x = mInv * y + b;
      point(x, y);
    }
  }
}

// Método 2: DDA
function ddaLine(x0, y0, x1, y1) {
  stroke('green');
  let dx = x1 - x0;
  let dy = y1 - y0;
  let steps = max(abs(dx), abs(dy));

  let xInc = dx / steps;
  let yInc = dy / steps;

  let x = x0;
  let y = y0;

  for (let i = 0; i <= steps; i++) {
    point(x, y);
    x += xInc;
    y += yInc;
  }
}

// Método 3: Bresenham
function bresenhamLine(x0, y0, x1, y1) {
  stroke('blue');

  let x = round(x0);
  let y = round(y0);
  let dx = abs(round(x1) - x);
  let dy = abs(round(y1) - y);
  let sx = x < x1 ? 1 : -1;
  let sy = y < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    point(x, y);
    if (x === round(x1) && y === round(y1)) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}
