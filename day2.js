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

const intcode = function(program) {
  for (let i = 0; i < program.length; i += 4) {
    if (program[i] === 1) {
      let sum = program[program[i + 1]] + program[program[i + 2]];
      program[program[i + 3]] = sum;
    } else if (program[i] === 2) {
      let product = program[program[i + 1]] * program[program[i + 2]];
      program[program[i + 3]] = product;
    } else if (program[i] === 99) {
      return program;
    }
  }
  return program;
};

data.splice(1, 1, 12);
data.splice(2, 1, 2);
console.log(intcode(data)[0]);
