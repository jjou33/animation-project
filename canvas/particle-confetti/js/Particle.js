import { hexToRgb, randomNumBetween } from "./Utils.js";

export default class Particle {
  constructor(x, y, deg = 0, colors, shapes, spread = 15) {
    this.angle = (Math.PI / 180) * randomNumBetween(deg - spread, deg + spread);
    this.radius = randomNumBetween(30, 100);
    this.x = x * innerWidth;
    this.y = y * innerHeight;
    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);
    this.friction = 0.85;
    this.gravity = 0.5;
    this.width = 12;
    this.height = 12;

    this.opacity = 1;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);

    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1);

    this.colors = colors || ["#FF577F", "#FF884B", "#FFD384", "#FFF9B0"];

    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length))]
    );

    this.shapes = shapes || ["circle", "square"];

    this.shape =
      this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.opacity -= 0.005;

    this.widthDelta += 2;
    this.heightDelta += 2;

    this.rotation += this.rotationDelta;
  }
  drawSquare(ctx) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta)
    );
  }
  drawCircle(ctx) {
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(this.width * Math.cos((Math.PI / 180) * this.widthDelta)) / 2,
      Math.abs(this.height * Math.sin((Math.PI / 180) * this.heightDelta)) / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
  }
  draw(ctx) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2);
    ctx.rotate((Math.PI / 180) * this.rotation);
    ctx.translate(-this.x - this.width, -this.y - this.height);

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;

    switch (this.shape) {
      case "square":
        this.drawSquare(ctx);
        break;
      case "circle":
        this.drawCircle(ctx);
        break;
    }

    ctx.resetTransform();
  }
}
