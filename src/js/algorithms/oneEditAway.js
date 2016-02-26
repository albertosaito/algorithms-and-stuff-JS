/*
Recently I was asked to code this in a coding interview. Basically the problem
was to create a function that checked if a string value is "just one edit away".
What I did was to define "one edit away" as one REPLACE, or one DELETE or one
INSERT. This was implemented with 2 sub functions:

// one REPLACE
//isOnlyOneCharDifferent (a,b)
// one DELETE
//isOneCharMissing (a, b)
// one INSERT
//isOneCharMissing (b, a)
*/
function isOneEditAway(a, b) {
  return isOnlyOneCharDifferent(a, b)
  || isOnlyOneCharMissing(a, b)
  || isOnlyOneCharMissing(b, a);
}

function isOnlyOneCharDifferent(a, b) {
  if (a.length != b.length) {
    return false;
  }
  var differentChars = 0;
  var i = 0;
  while (differentChars <= 1 && i<a.length) {
    if (a.charAt(i) !== b.charAt(i)) {
      differentChars++;
    }
    i++;
  }
  return !(differentChars > 1 || differentChars == 0);
}

function isOnlyOneCharMissing(a, b) {
  if (a.length - 1 != b.length) {
    return false;
  }

  var i =0;
  while (a.charAt(i) === b.charAt(i) && i < b.length) {
    i++;
  }

  //from here check the rest of the str
  var newStrIndex = i+1;
  while (a.charAt(newStrIndex) === b.charAt(i) && i < b.length) {
    i++;
    newStrIndex++;
  }
  return i === b.length;
}

console.log(isOneEditAway('apple', 'apples'));
