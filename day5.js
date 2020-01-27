// Opcode 3 takes a single integer as input and saves it to the position given by its only parameter.
// For example, the instruction 3,50 would take an input value and store it at address 50.
// Opcode 4 outputs the value of its only parameter.
// For example, the instruction 4,50 would output the value at address 50.

// parameter modes
// position (mode 0) - parameter is location (from day 2)
// immediate (mode 1) - parameter is value

// ABCDE
//  1002
// DE - two-digit opcode,      02 == opcode 2
//  C - mode of 1st parameter,  0 == position mode
//  B - mode of 2nd parameter,  1 == immediate mode
//  A - mode of 3rd parameter,  0 == position mode, omitted due to being a leading zero

// instruction pointer should increase by the number of values in the instruction after the instruction finishes.
// Because of the new instructions, this amount is no longer always 4.
const fs = require("fs");
let data = fs
  .readFileSync("./day5-input.txt")
  .toString()
  .split(",")
  .map(yeet => Number(yeet));

const getOpcode = function(inst) {
  return Number(inst.toString().slice(-2));
};

const getMode1 = function(inst) {
  if (inst.toString().length <= 2) {
    return 0;
  }
  return Number(inst.toString().slice(-3, -2));
};

const getMode2 = function(inst) {
  if (inst.toString().length <= 3) {
    return 0;
  }
  return Number(inst.toString().slice(-4, -3));
};

const getMode3 = function(inst) {
  if (inst.toString().length <= 4) {
    return 0;
  }
  return 1;
};

// if mode is position - use index of the index
// if mode is immediate - use just the index

// part 1
// i can't believe this worked
const intcode = function(arr) {
  let i = 0;
  while (i < arr.length) {
    let opcode = getOpcode(arr[i]);

    if (opcode === 99) {
      return arr;
    }

    let mode1 = getMode1(arr[i]);
    let mode2 = getMode2(arr[i]);
    let mode3 = getMode3(arr[i]);

    let param1 = mode1 ? arr[i + 1] : arr[arr[i + 1]]
    let param2 = mode2 ? arr[i + 2] : arr[arr[i + 2]]
    let loc = mode3 ? i + 3 : arr[i + 3]

    if (opcode === 1) {
      arr[loc] = param1 + param2;
      i += 4;
    } else if (opcode === 2) {
      arr[loc] = param1 * param2;
      i += 4;
    } else if (opcode === 3) {
      arr[loc] = param1;
      i += 2;
    } else if (opcode === 4) {
      arr[0] = param1;
      i += 2;
    }
  }
  return arr;
};


data[1] = 1;


let result = intcode(data);
console.log(result[0]);
