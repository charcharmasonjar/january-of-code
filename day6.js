const fs = require("fs");
let data = fs
  .readFileSync("./day6-input.txt")
  .toString()
  .split("\n");

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
    currentSat = obj[currentSat]
    count ++;
  }
  return count;
}

// call count function for each key in the object
const countPaths = function(obj) {
  let count = 0;
  let arr = Object.keys(obj);
  for (const item of arr) {
    count += countPath(item, obj);
  }
  return count;
}

const obj = makeObject(data);
console.log(countPaths(obj));