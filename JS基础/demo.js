

function sum() {
  var num = arguments[0];
  if (arguments.length === 2) {
    return arguments[0] + arguments[1]
  } else {
    return function (sec) {
      return num + sec;
    }
  }

}
// console.log(sum(2, 3));//5
// console.log(sum(2)(3));//5 

// "loveleetcode"
var firstUniqChar = function (s) {
  if (s.length == 0) return ' '
  let arr = 0
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) == s.lastIndexOf(s[i])) {
      return s[i]
    } else {
      arr++
    }
  }
  if (arr) return ' '
};

console.log(firstUniqChar("loveleetcode"))