const environment = document.getElementById('environment');
const neutral = "#3895D3";
const aggro = "#FF6600";
var aggroDistance = 100;
const startingPoint = 250;
var points = [350 , startingPoint];

//Should probably put this in a constructor.
const newCurve = document .createElementNS("http://www.w3.org/2000/svg", "path");

newCurve.setAttribute("id", "new-curve");
newCurve.setAttribute("fill", "none");
newCurve.setAttribute("stroke-width", "6");
newCurve.setAttribute("stroke", neutral);
//newCurve.setAttribute("d", "M 250 250 C 275 250 285 450 600 250 L 600 200 ");
//newCurve.setAttribute("d", `M ${blx} ${bly} C ${blx} ${bly}, ${points}, ${brx} ${bry}`);
newCurve.setAttribute("d", `M 200 250 C 200 250, ${points}, 500 250`);
//Can you find the C and M bits with a regex and then append bits between them? Or something?


environment.appendChild ( newCurve );

rect = newCurve.getBoundingClientRect();
console.log(rect);

/*For visualizing the controls and bounding box*/
//Wrap in a function that takes input from a button (visualization mode on/off) and a couple of constructors, this is
//Quick and dirty
const visualize = function(){
controlPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
controlPoint.setAttribute('fill', 'red');
controlPoint.setAttribute('cx', points[0]);
controlPoint.setAttribute('cy', points[1]);
controlPoint.setAttribute('r', 4);

environment.appendChild ( controlPoint );

visLines = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
visLines.setAttribute('fill', 'none');
visLines.setAttribute('stroke', 'gray');
visLines.setAttribute('points', `${rect.left}, ${rect.bottom} ${rect.right}, ${rect.bottom} ${rect.right}, ${rect.top} ${rect.left}, ${rect.top}`);

environment.appendChild ( visLines );
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
    visLines.setAttribute('points', `${rect.left}, ${rect.bottom} ${rect.right}, ${rect.bottom} ${rect.right}, ${rect.top} ${rect.left}, ${rect.top}`); 
}
*/


onmousemove = function(e) {
    /**
     * If abs of mousex - rectx < x (or any of the permeutations of the sides),
     * move control point to mousex, recty (or equaivalent).
     * Then, move y (or equivalent) to maintain distance from (aggro range coordinate)
     * Remember to allow for the corners to move as well.
     */

    if(Math.abs(e.clientX-rect.top) < 200){
        points[1] += (((e.clientX-rect.top)/100)*-1);
        newCurve.setAttribute('stroke', aggro);
        newCurve.setAttribute("d", `M 200 250 C 200 250, ${points}, 500 250`);
        }
        else {
            newCurve.setAttribute('stroke', neutral);
            points[1] = startingPoint;
            newCurve.setAttribute("d", `M 200 250 C 200 250, ${points}, 500 250`);
        }

}

/**
 * Notes:
 * Find each M. The 2 numbers after that are a point, group them.
 * Find each C. The 3 pairs of 2 numbers after that are the control and edge points, group them.
 * Remember that the first point after a C should in this case probably be the same as the M point
 * preceding it, because you want to curve from the same place you put down the pencil.
 * 
 */

