const fs = require("fs");
let data = fs
  .readFileSync("./day7-input.txt")
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

// part 1 and 2
const intcode = function(arr, input1, input2) {
  let i = 0;
  let input = 0;
  while (i < arr.length) {
    let opcode = getOpcode(arr[i]);

    if (opcode === 99) {
      return arr;
    }
    let mode1 = getMode1(arr[i]);
    let mode2 = getMode2(arr[i]);
    let mode3 = getMode3(arr[i]);

    let param1 = mode1 ? arr[i + 1] : arr[arr[i + 1]];
    let param2 = mode2 ? arr[i + 2] : arr[arr[i + 2]];
    let loc = mode3 ? i + 3 : arr[i + 3];

    if (opcode === 1) {
      arr[loc] = param1 + param2;
      i += 4;
    } else if (opcode === 2) {
      arr[loc] = param1 * param2;
      i += 4;
    } else if (opcode === 3) {
      if (input === 0) {
        arr[arr[i + 1]] = input1;
        input++;
      } else {
        arr[arr[i + 1]] = input2;
      }
      i += 2;
    } else if (opcode === 4) {
      return new Promise((res, rej) => {
        res(param1);
        rej("i fucked up");
      });
      i += 2;
    } else if (opcode === 5) {
      // jump-if-true
      // if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter.
      // Otherwise, it does nothing.
      if (param1 != 0) {
        i = param2;
      } else {
        i += 3;
      }
    } else if (opcode === 6) {
      // jump-if-false
      // if the first parameter is zero, it sets the instruction pointer to the value from the second parameter.
      // Otherwise, it does nothing.
      if (param1 == 0) {
        i = param2;
      } else {
        i += 3;
      }
    } else if (opcode === 7) {
      // less than
      // if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter.
      // Otherwise, it stores 0
      if (param1 < param2) {
        arr[loc] = 1;
      } else {
        arr[loc] = 0;
      }
      i += 4;
    } else if (opcode === 8) {
      // is equals
      // if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter.
      // Otherwise, it stores 0
      if (param1 == param2) {
        arr[loc] = 1;
      } else {
        arr[loc] = 0;
      }
      i += 4;
    }
  }
  return arr;
};

const getPermutations = function(input) {
  const permutations = [];

  const perm = function(arr, result = []) {
    if (arr.length === 0) {
      permutations.push(result);
    }
    for (let i = 0; i < arr.length; i++) {
      const current = [...arr];
      const next = current.splice(i, 1);
      perm(current, result.concat(next));
    }
  };

  perm(input);

  return permutations;
};

const perms = getPermutations([0, 1, 2, 3, 4]);
const getThrust = function(data, perms) {
  let result = 0;
  for (const perm of perms) {
    intcode([...data], perm[0], 0).then(res => {
      intcode([...data], perm[1], res).then(res => {
        intcode([...data], perm[2], res).then(res => {
          intcode([...data], perm[3], res).then(res => {
            intcode([...data], perm[4], res).then(res => {
              if (res > result) {
                result = res;
                // i can't get the stupid thing to return
                // so the answer is the last item printed to the console
                // sue me
                console.log(result);
              }
            });
          });
        });
      });
    });
  }
};

getThrust(data, perms);
