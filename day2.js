// first integer
// 99 - halt program
// 1 - add integers at two following positions, store in third
// 2 - same as one, but multiply
// then move on by moving four positions to the next opcode
const fs = require("fs");
let data = fs
  .readFileSync("./day2-input.txt")
  .toString()
  .split(",")
  .map(yeet => Number(yeet));

// part 1 
const intcode = function(arr) {
  for (let i = 0; i < arr.length; i += 4) {
    if (arr[i] === 1) {
      let sum = arr[arr[i + 1]] + arr[arr[i + 2]];
      arr[arr[i + 3]] = sum;
    } else if (arr[i] === 2) {
      let product = arr[arr[i + 1]] * arr[arr[i + 2]];
      arr[arr[i + 3]] = product;
    } else if (arr[i] === 99) {
      return arr;
    }
  }
  return arr;
};

// replace data[1] and data[2] as requested
data.splice(1, 1, 12);
data.splice(2, 1, 2);
// console.log(intcode(data)[0]);

// part 2
// which values at data[1] and data[2] make data[0] = 19690720
// values are both between 0 and 99 inclusive
const findInputs = function(arr, output) {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j ++) {
      let test = [...arr]
      test[1] = i;
      test[2] = j;
      if (intcode(test)[0] === output) {
        return 100 * i + j

      } 
    }
  }
}
const output = 19690720;
console.log(findInputs(data, output));