import { createCanvas, loadImage } from "canvas";
import fetch from "node-fetch";

export async function createShip(user1, user2) {
  const width = 800, height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Arka plan
  ctx.fillStyle = "#1e1e2f";
  ctx.fillRect(0, 0, width, height);

  // Avatarları indir
  const [img1, img2] = await Promise.all([
    loadImage(await (await fetch(user1)).buffer()),
    loadImage(await (await fetch(user2)).buffer())
  ]);

  // Yuvarlak avatar çiz
  function drawCircleImage(img, x, y, size) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, size, size);
    ctx.restore();
  }

  drawCircleImage(img1, 100, 100, 200);
  drawCircleImage(img2, 500, 100, 200);

  // Kalp emojisi ❤️
  ctx.font = "100px Sans";
  ctx.fillStyle = "red";
  ctx.fillText("❤️", 350, 220);

  return canvas.toBuffer("image/png");
}
