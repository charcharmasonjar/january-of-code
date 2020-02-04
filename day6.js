const fs = require("fs");
let data = fs
  .readFileSync("./day6-input.txt")
  .toString()
  .split("\n");

// part 1
// create object with satellites as keys
const makeObject = function(arr) {
  const obj = {};
  for (const item of arr) {
    obj[item.slice(4)] = item.slice(0, 3);
  }
  return obj;
};

// function that counts the orbits back to center
const countPath = function(sat, obj) {
  let count = 0;
  let currentSat = sat;
  while (obj[currentSat]) {
    currentSat = obj[currentSat];
    count++;
  }
  return count;
};


// call count function for each key in the object
const countPaths = function(obj) {
  let count = 0;
  let arr = Object.keys(obj);
  for (const item of arr) {
    count += countPath(item, obj);
  }
  return count;
};

// part 2
// creates array of steps for a given satellite back to the center
const getPath = function(sat, obj) {
  const path = [];
  let currentSat = sat;
  while (obj[currentSat]) {
    path.push(currentSat);
    currentSat = obj[currentSat];
  }
  return path;
};

// compares two arrays to find closest common ancestor
// returns sum - 2 to get total steps
const getAncestor = function(sat1, sat2) {
  for (let i = 0; i < sat1.length; i++) {
    for (let j = 0; j < sat2.length; j++) {
      if (sat1[i] === sat2[j]) {
        return i + j - 2;
      }
    }
  }
};

const obj = makeObject(data);

// part 1 answer
console.log(countPaths(obj));

// part 2 answer
const youPath = getPath("YOU", obj);
const sanPath = getPath("SAN", obj);
console.log(getAncestor(youPath, sanPath));
