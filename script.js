const environment = document.getElementById('environment');
const neutral = '#3895D3';
const aggro = '#FF6600';
const aggroRange = 100;
const startingPoint = 250;
const points = [350, startingPoint];
const debugMode = false;

// Should probably put this in a constructor.
const newCurve = document.createElementNS('http://www.w3.org/2000/svg', 'path');

newCurve.setAttribute('id', 'new-curve');
newCurve.setAttribute('fill', 'none');
newCurve.setAttribute('stroke-width', '6');
newCurve.setAttribute('stroke', neutral);
newCurve.setAttribute('stroke-linecap', 'round');
// newCurve.setAttribute("d", "M 250 250 C 275 250 285 450 600 250 L 600 200 ");
// newCurve.setAttribute("d", `M ${blx} ${bly} C ${blx} ${bly}, ${points}, ${brx} ${bry}`);
newCurve.setAttribute('d', `M 200 250 C 200 250, ${points}, 500 250`);
// Can you find the C and M bits with a regex and then append bits between them? Or something?


environment.appendChild(newCurve);

const rect = newCurve.getBoundingClientRect();

/* For visualizing the controls and bounding box */
// Wrap in a function that takes input from a button (visualization mode on/off)
// and a couple of constructors; this is quick and dirty
function visualize() {
  const controlPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  controlPoint.setAttribute('fill', 'red');
  controlPoint.setAttribute('cx', points[0]);
  controlPoint.setAttribute('cy', points[1]);
  controlPoint.setAttribute('r', 4);

  environment.appendChild(controlPoint);

  const visLines = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  visLines.setAttribute('fill', 'none');
  visLines.setAttribute('stroke', 'gray');
  visLines.setAttribute('points', `${rect.left}, ${rect.bottom} ${rect.right}, ${rect.bottom} ${rect.right}, ${rect.top} ${rect.left}, ${rect.top}`);

  environment.appendChild(visLines);
  console.log(`${rect.bottom}, ${rect.left}`);
  console.log(`${rect.bottom}, ${rect.right}`);
}

/*
onclick = function(e){
    points[1] += 50;
    rect = newCurve.getBoundingClientRect();
    newCurve.setAttribute("d", `M 200 250 C 200 250, ${points}, 500 250`);
    controlPoint.setAttribute('cx', points[0]);
    controlPoint.setAttribute('cy',points[1]);
    console.log("mouse location:", e.clientX, e.clientY);
    console.log(e.clientX-rect.top);
    visLines.setAttribute('points', `${rect.left}, ${rect.bottom} ${rect.right},
    ${rect.bottom} ${rect.right}, ${rect.top} ${rect.left}, ${rect.top}`);
}
*/

let mousePrev = 0;

onmousemove = function (e) {
  const mouseNew = e.clientY;
  /**
     * If abs of mousex - rectx < x (or any of the permeutations of the sides),
     * move control point to mousex, recty (or equivalent).
     * Then, move y (or equivalent) to maintain distance from (aggro range coordinate)
     * Remember to allow for the corners to move as well.
     * Start with a line.
     * Need to determine which way the mouse is moving
     * Measure jerk of mouse and adjust severity of avoidance
     * with an easing function. (Curves on Curves!)
     */
  if (Math.abs(e.clientY - rect.top) <= aggroRange) { // Cursor is in aggro range.
    if (e.clientX > rect.left && e.clientX < rect.right) {
      points[0] = e.clientX;
      if (e.clientY - rect.top <= 0) { // Cursor is above line
        if (mouseNew < mousePrev) { // Cursor is moving up?
          points[1] += ((Math.floor(e.clientY - rect.top) / 20));
        } else if (mouseNew >= mousePrev) {
          points[1] -= (Math.floor(e.clientY - rect.top) / 20);
        }
        if (points[1] < startingPoint) points[1] == startingPoint; 
        // Prevent line from moving toward mouse at edge of aggro range
      } else if (e.clientY - rect.top > 0) { // Cursor is below line
        if (mouseNew < mousePrev) {
          points[1] -= ((Math.floor(e.clientY - rect.top) / 20));
        } else if (mouseNew >= mousePrev) {
          points[1] += (Math.floor(e.clientY - rect.top) / 20);
        }
        if (points[1] >= startingPoint) points[1] == startingPoint;
      }
      newCurve.setAttribute('stroke', aggro);
      newCurve.setAttribute('d', `M 200 250 C 200 250, ${points}, 500 250`);
    }
  } else { // Cursor is out of aggro range; reset.
    newCurve.setAttribute('stroke', neutral);
    points[1] = startingPoint;
    newCurve.setAttribute('d', `M 200 250 C 200 250, ${points}, 500 250`);
  }
  mousePrev = e.clientY;
};


if (debugMode) {
  visualize();
}

/**
 * Notes:
 * Find each M. The 2 numbers after that are a point, group them.
 * Find each C. The 3 pairs of 2 numbers after that are the control and edge points, group them.
 * Remember that the first point after a C should in this case probably be the same as the M point
 * preceding it, because you want to curve from the same place you put down the pencil.
 *
 */


const pixelCanvas = document.getElementById('pixel-canvas');

const alien = [ 
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [0,1,0,1,0],
                [0,1,0,1,0]
              ]
var x = 0;
var y = 0;
const iterator = [x,y]

function makeSVG(arr) {
  for (let i = 0; i < arr.length; i++) {
    y = i;
    x = 0;
    var row = arr[i]
    for (let j= 0; j < row.length; j++){
      x = j;
      if (row[j] === 1) {
        const pixel = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        pixel.setAttribute('height',1.01);
        pixel.setAttribute('width',1.01);
        pixel.setAttribute('stroke','none');
        pixel.setAttribute('fill','blue');
        pixel.setAttribute('x', x);
        pixel.setAttribute('y', y);
        //pixel.setAttribute('transform', `translate(${(Math.floor(Math.random() * Math.floor(5)))}, ${(Math.floor(Math.random() * Math.floor(5)))})`)
        pixelCanvas.appendChild(pixel);
        pixel.setAttribute('opacity', 1);
      }else {
        //
      }
    }
  }
}

makeSVG(alien)

              