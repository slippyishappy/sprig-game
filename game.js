const player = "p"
const floor = "f";
const mouse = "m";

setLegend(
  [ player, bitmap`
................
................
................
................
......00.....0..
......010...090.
......0110009900
.00..01111229990
020..01112222990
010..02220220220
0120.02220220220
.02200022222220.
..099920000000..
...092221112220.
...022222222220.
...020200002020.`],
  [ floor, bitmap`
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL` ],
  [ mouse, bitmap`
................
................
................
................
................
................
................
.......000.00...
......08810LL0..
......08810LL0..
......088111110.
..00..008810100.
.08800LLL11111C0
08008LLLLL11880.
.0..0LLLLLLL00..
.....0L00LL0....` ]
)

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
