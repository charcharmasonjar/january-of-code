// It is a six-digit number within range 236491-713787
// Two adjacent digits are the same (like 22 in 122345)
// Going from left to right, the digits never decrease

// part 1
const hasPair = function(meep) {
  for (let i = 0; i < meep.length; i++) {
    if (meep[i] === meep[i + 1]) {
      return true;
    }
  }
  return false;
};

const countPasswords = function(min, max, func) {
  let count = 0;
  for (let i = min; i <= max; i++) {
    let str = i.toString();
    if (
      str ===
        str
          .split("")
          .sort()
          .join("") &&
      func(str)
    ) {
      count++;
    }
  }
  return count;
};

let min = 236491;
let max = 713787;

console.log(countPasswords(min, max, hasPair));

// part 2
// the two adjacent matching digits are not part of a larger group of matching digits
const hasJustPair = function(str) {
  const obj = {};
  for (let i = 0; i < str.length; i++) {
    if (!obj[str[i]]) {
      obj[str[i]] = 1;
    }
    if (str[i] === str[i + 1]) {
      obj[str[i]]++;
    }
  }
  // must contain a value of 2
  if (!Object.values(obj).includes(2)) {
    return false;
  }

  return true;
};

console.log(countPasswords(min, max, hasJustPair));
