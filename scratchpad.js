/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

var list = Function.call.bind(Array.prototype.slice);
var concat = (sum, elt) => sum.concat(elt)

var table_body = document.getElementsByTagName("table")[4].tBodies[0]
var rows = list(table_body.rows).filter( (row, index, array) => 
    index > 1 && index < array.length - 1
);
var cells = list(rows).map(row => list(row.cells)).reduce(concat);

var random_color = () => Math.floor(Math.random()*255*255*255);
cells.forEach(cell => cell.bgcolor = ("#"+random_color().toString(16)));
for (cell of cells) cell.bgcolor = "#"+random_color().toString(16)
