import './lib/p5play';
import './style.css';

let player: Sprite;
let floor: Sprite;
let boxes: Group;

function setup(): void {
  new Canvas(800, 450);
  world.gravity.y = 10;

  floor = new Sprite(400, 430, 800, 40, STATIC);
  floor.color = color(80, 80, 100);

  player = new Sprite(400, 100, 50, 50);
  player.color = color(255, 120, 80);
  player.rotationLock = true;

  boxes = new Group();
}

function draw(): void {
  background(30, 30, 40);

  if (kb.pressing('left')) player.vel.x = -5;
  else if (kb.pressing('right')) player.vel.x = 5;
  else player.vel.x *= 0.9;

  if (kb.presses('up') || kb.presses('space')) player.vel.y = -7;

  // クリックした位置に箱を落とす
  if (mouse.presses('left')) {
    const b = new boxes.Sprite(mouse.x, mouse.y, random(20, 50), random(20, 50));
    b.color = color(120, 200, 255);
    b.rotation = random(360);
  }

  fill(255);
  noStroke();
  textSize(16);
  text('← → で移動 / ↑ or Space でジャンプ / クリックで箱を落とす', 16, 28);
}

// p5 のグローバルモード: window に setup / draw を登録すると p5 が自動で起動する
window.setup = setup;
window.draw = draw;
