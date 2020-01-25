const fs = require("fs");
let data = fs
  .readFileSync("./day3-input.txt")
  .toString()
  .split("\n");
let path1 = data[0].split(",");
let path2 = data[1].split(",");

// part 1
// this solution is trash lmao 
const getCoords = function(path) {
  let result = [[0, 0]];
  for (let i = 0; i < path.length; i++) {
    let distance = Number(path[i].slice(1));
    let prev = result[result.length - 1];
    if (path[i][0] === "R") {
      for (let j = 1; j <= distance; j++) {
        result.push([prev[0] + j, prev[1]]);
      }
    } else if (path[i][0] === "L") {
      for (let j = 1; j <= distance; j++) {
        result.push([prev[0] - j, prev[1]]);
      }
    } else if (path[i][0] === "U") {
      for (let j = 1; j <= distance; j++) {
        result.push([prev[0], prev[1] + j]);
      }
    } else if (path[i][0] === "D") {
      for (let j = 1; j <= distance; j++) {
        result.push([prev[0], prev[1] - j]);
      }
    }
  }
  return result;
};

const getIntersections = function(coords1, coords2) {
  let result = [];
  for (let i = 0; i < coords1.length; i ++) {
    for (let j = 0; j < coords2.length; j ++) {
      if (coords1[i][0] === coords2[j][0] && coords1[i][1] === coords2[j][1]) {
        result.push(coords1[i]);
      }
    }
  }
  return result;
};

const findShortest = function(intersections) {
  let result = [];
  intersections.forEach(coords => {
    result.push(Math.abs(coords[0]) + Math.abs(coords[1]));
  })
  // remove the first item as it's always 0
  result.shift();
  // return smallest value
  return Math.min(...result);
}

let intersections = getIntersections(getCoords(path1), getCoords(path2));
console.log(findShortest(intersections))
