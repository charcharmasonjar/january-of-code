// range: 236491-713787
// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

// part 1
const hasPair = function(meep) {
  for (let i = 0; i < meep.length; i++) {
    if (meep[i] === meep[i + 1]) {
      return true;
    }
  }
  return false;
};

const countPasswords = function(min, max) {
  let count = 0;
  for (let i = min; i <= max; i++) {
    let str = i.toString();
    if (
      str ===
        str
          .split("")
          .sort()
          .join("") &&
      hasPair(str)
    ) {
      count++;
    }
  }
  return count;
}

let min = 236491;
let max = 713787;

console.log(countPasswords(min, max));
