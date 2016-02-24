/*
Function to rotate a string
*/
function rotateString(str, steps) {
  var result = '';
  var rightSide = str.slice(0, steps+1);
  var leftSide = str.slice(steps+1);
  return leftSide.concat(rightSide);
}

/*
Check if a string B is a rotated version of string A
*/
function isRotatedString(strA, strB) {
  if (strA.length != strB.length) {
    return false
  }
  var doubleString = strA.concat(strA);
  return doubleString.indexOf(strB) > 0;
}

console.log(isRotatedString('saito', 'aitos'));
