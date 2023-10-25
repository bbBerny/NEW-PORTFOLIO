function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;

  // Draw the white circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // Draw the edge circle with gradient
  grad = ctx.createRadialGradient(0, 0, radius - 10, 0, 0, radius);
  grad.addColorStop(0, "lightblue");
  grad.addColorStop(1, "darkblue");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fill();

  // Center circle
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num = 1;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";

  for (var i = 0; i < 12; i++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);

    num++;
  }
}

function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  // Hour
  hour = hour % 12;
  var hourAngle = (hour + minute / 60) * Math.PI / 6;

  // Minute
  var minuteAngle = minute * Math.PI / 30;

  // Second
  var secondAngle = second * Math.PI / 30;

  drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07);
  drawHand(ctx, minuteAngle, radius * 0.8, radius * 0.07);
  drawHand(ctx, secondAngle, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
