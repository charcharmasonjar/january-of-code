const fs = require("fs");
let data = fs
  .readFileSync("./day1-input.txt")
  .toString()
  .split("\n")
  .map(yeet => Number(yeet));

// part 1
const fuelSum = function(weights) {
  let result = 0;
  for (const weight of weights) {
    result += Math.floor(weight / 3) - 2;
  }
  return result;
};

console.log(fuelSum(data));

// part 2
const getFuel = function(weight) {
  let result = Math.floor(weight / 3) - 2;
  if (Math.floor(result / 3) - 2 > 0) {
    return (result += getFuel(result));
  } else {
    return result;
  }
};

const fuelSumAgain = function(weights) {
  let result = 0;
  for (const weight of weights) {
    result += getFuel(weight);
  }
  return result;
};

console.log(fuelSumAgain(data));
