let slices = 8; // Cambia este número si quieres diferentes rebanadas

function setup() {
  createCanvas(900, 300);
  background(255);
  noLoop();

  // Posiciones x para cada pizza
  let centers = [150, 450, 750];

  // Dibujar las 3 pizzas
  drawPizza(centers[0], 150, 100, slices, "point-slope");
  drawPizza(centers[1], 150, 100, slices, "dda");
  drawPizza(centers[2], 150, 100, slices, "bresenham");
}

function drawPizza(cx, cy, r, numSlices, method) {
  // Dibuja la base de la pizza
  stroke(0);
  noFill();
  circle(cx, cy, r * 2);

  for (let i = 0; i < numSlices; i++) {
    let angle = TWO_PI * i / numSlices;
    let x1 = cx;
    let y1 = cy;
    let x2 = cx + r * cos(angle);
    let y2 = cy + r * sin(angle);

    switch (method) {
      case "point-slope":
        pointSlopeLine(x1, y1, x2, y2);
        break;
      case "dda":
        ddaLine(x1, y1, x2, y2);
        break;
      case "bresenham":
        bresenhamLine(x1, y1, x2, y2);
        break;
    }
  }
}

// Algoritmo Punto-Pendiente (y = mx + b)
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

// Algoritmo DDA
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

// Algoritmo Bresenham
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
