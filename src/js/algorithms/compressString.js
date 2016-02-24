/**
Function to compress a string by counting how many of the same char are sequentially
adjacent.

For example:
aaaabbbc -> 4a3b1c
abcd -> abcd (not 1a1b1c1d, because it is longer)
aaaaabbbbb -> 5a5b
*/
function compressString(str) {
  var result = '';
  var currentChar = str.charAt(0);
  var currentCount=1;
  for (var i=1; i<str.length; i++) {
    if (str.charAt(i) !== currentChar) {
      result = result.concat(currentCount + currentChar);
      currentChar = str.charAt(i);
      currentCount = 1;
    }
    else {
      currentCount++;
    }
  }
  result = result.concat(currentCount + currentChar);
  return result.length < str.length ? result : str;
}

console.log(compressString('aaaaaaaaaaaaaaaaaaaaaaabbcccccdas'));
