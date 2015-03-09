var app = require('./ga-tsp.js');
var p1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var p2 = [4, 5, 2, 1, 8, 7, 6, 9, 3];
var offspring = app.pmx(p1, p2);
console.log(offspring[0]);
//console.log(offspring[1]);
var o0 = app.rsm(offspring[0]);
console.log(o0);