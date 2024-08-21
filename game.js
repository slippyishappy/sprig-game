const player = "p"
const floor = "f";
const mouse = "m";
const backgroundTune = tune`
267.85714285714283,
267.85714285714283: E4~267.85714285714283 + F4~267.85714285714283 + G4~267.85714285714283 + A4~267.85714285714283 + D5^267.85714285714283,
267.85714285714283: A4~267.85714285714283 + B4~267.85714285714283,
267.85714285714283: B4~267.85714285714283 + F4^267.85714285714283,
267.85714285714283: B4~267.85714285714283,
267.85714285714283: B4~267.85714285714283 + C5~267.85714285714283,
267.85714285714283: D5~267.85714285714283 + C5~267.85714285714283 + E4^267.85714285714283,
267.85714285714283: C5~267.85714285714283 + B4~267.85714285714283 + A4~267.85714285714283,
267.85714285714283: A4~267.85714285714283 + B4~267.85714285714283,
267.85714285714283: B4~267.85714285714283 + C5~267.85714285714283 + D4^267.85714285714283,
267.85714285714283: C5~267.85714285714283 + A4~267.85714285714283 + G4~267.85714285714283 + F4~267.85714285714283,
267.85714285714283: B4~267.85714285714283 + A4~267.85714285714283 + F4~267.85714285714283,
267.85714285714283: F4~267.85714285714283 + E5^267.85714285714283,
267.85714285714283: F4~267.85714285714283 + G4~267.85714285714283,
267.85714285714283: A4~267.85714285714283 + B4~267.85714285714283 + C5~267.85714285714283,
267.85714285714283: D5~267.85714285714283 + G4^267.85714285714283,
267.85714285714283: D5~267.85714285714283 + E4^267.85714285714283,
267.85714285714283: D5~267.85714285714283 + C5~267.85714285714283 + B4~267.85714285714283 + A4~267.85714285714283 + G4~267.85714285714283,
267.85714285714283: F4~267.85714285714283,
267.85714285714283: F4~267.85714285714283 + G4~267.85714285714283 + G5^267.85714285714283,
267.85714285714283: A4~267.85714285714283 + B4~267.85714285714283 + C5~267.85714285714283 + D5~267.85714285714283,
267.85714285714283: E5~267.85714285714283,
267.85714285714283: E5~267.85714285714283 + D4^267.85714285714283,
267.85714285714283: D5~267.85714285714283 + C5~267.85714285714283 + B4~267.85714285714283 + A4~267.85714285714283 + G4~267.85714285714283,
267.85714285714283: E4~267.85714285714283 + F4~267.85714285714283,
267.85714285714283: F4~267.85714285714283 + G4~267.85714285714283 + A4~267.85714285714283 + E5^267.85714285714283,
267.85714285714283: B4~267.85714285714283 + C5~267.85714285714283 + D5~267.85714285714283,
267.85714285714283: D5~267.85714285714283,
267.85714285714283: D5~267.85714285714283 + C5~267.85714285714283 + E4^267.85714285714283,
267.85714285714283: B4~267.85714285714283 + A4~267.85714285714283 + G4~267.85714285714283 + F4~267.85714285714283,
267.85714285714283: F4~267.85714285714283,
267.85714285714283: F4~267.85714285714283 + G4~267.85714285714283 + B4^267.85714285714283`;
const mouseSound = tune`
112.5,
37.5: A4-37.5 + C5/37.5,
37.5: B4~37.5,
37.5,
37.5: G4-37.5 + C5^37.5 + A4~37.5,
37.5: G4-37.5 + B4^37.5 + A4/37.5,
37.5,
37.5: D5-37.5 + E5-37.5 + F5/37.5,
37.5: E5-37.5 + F5-37.5,
787.5`;
const playBackgroundTune = playTune(backgroundTune, Infinity);

setSolids([player])

let level = 0
const levels = [
  map`
p......
.......
....m..
.......
.......
.......
.......`
];

setMap(levels[level])

setBackground(floor)

setPushables({
  [ player ]: []
})

onInput("w", () => {
  console.log(getFirst(player).y);
  getFirst(player).y -= 1
})

onInput("s", () => {
  console.log(getFirst(player).y);
  getFirst(player).y += 1
})

onInput("d", () => {
  console.log(getFirst(player).x);
  getFirst(player).x += 1
})

onInput("a", () => {
  console.log(getFirst(player).x);
  getFirst(player).x -= 1
})

const mouseSprite = getFirst(mouse);

function randomizeCoordinatesMouse() {
  mouseSprite.x = Math.floor(Math.random() * 7);
  mouseSprite.y = Math.floor(Math.random() * 7);
  addText(`Score: ${score}`, {x: 10, y: 0, color:color`2`});
}

let seconds = 60;
addText(`Time: ${seconds}`, {x: 10, y: 1, color:color`2`});

function countdown() {
  const timer = setInterval(() => {
    seconds--;
    addText(`Time: ${seconds}`, {x: 10, y: 1, color:color`2`});
    
    if (seconds == 0) {
      clearInterval(timer);
      clearText();
      addText(`Time's up!`, {x: 6, y: 7, color:color`2`});
      addText(`You caught`, {x: 6, y: 8, color:color`2`});
      addText(`${score} mice`, {x: 7, y: 9, color:color`2`});
      playBackgroundTune.end();
    }
  }, 1000)
}

randomizeCoordinatesMouse();
countdown();

let score = 0;
addText(`Score: ${score}`, {x: 10, y: 0, color:color`2`});
afterInput(() => {
  if(tilesWith(mouse, player).length >= 1) {
    score++;
  };

  afterInput(() => {
  if(tilesWith(mouse, player).length >= 1) {
    score++;
    playTune(mouseSound);
    randomizeCoordinatesMouse();
  };
  
})
