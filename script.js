const environment = document.getElementById('environment');

var points = [350 , 250];

const newCurve = document .createElementNS("http://www.w3.org/2000/svg", "path");

newCurve.setAttribute("id", "new-curve");
newCurve.setAttribute("fill", "none");
newCurve.setAttribute("stroke-width", "6");
newCurve.setAttribute("stroke", "green");
//newCurve.setAttribute("d", "M 250 250 C 275 250 285 450 600 250 L 600 200 ");
newCurve.setAttribute("d", `M 200 250 C 200 250, ${points}, 500 250`);
//Can you find the C and M bits with a regex and then append bits between them? Or something?


environment.appendChild ( newCurve );

controlPoint = document .createElementNS("http://www.w3.org/2000/svg", "circle");
controlPoint.setAttribute('fill', 'red');
controlPoint.setAttribute('cx', points[0]);
controlPoint.setAttribute('cy', points[1]);
controlPoint.setAttribute('r', 4);

environment.appendChild ( controlPoint );

rect = newCurve.getBoundingClientRect();


onclick = function(e){
    console.log(points);
    points[1] += 50;
    newCurve.setAttribute("d", `M 200 250 C 200 250, ${points}, 500 250`);
    controlPoint.setAttribute('cx', points[0]);
    controlPoint.setAttribute('cy',points[1]);
    console.log(points);
    console.log(rect);
    console.log("mouse location:", e.clientX, e.clientY)
}

/**
 * Notes:
 * Find each M. The 2 numbers after that are a point, group them.
 * Find each C. The 3 pairs of 2 numbers after that are the control and edge points, group them.
 * Remember that the first point after a C should in this case probably be the same as the M point
 * preceding it, because you want to curve from the same place you put down the pencil.
 * How to detect bounding box of element within svg???
 * Might need to not use the svg as the playing field, because you need to be able to detect it.
 * But then how to draw it once you've gotten within the border of the svg? Not sure.
 */

