/**
Function to print all string permutations
*/
function printAllStringPerms(str) {
  createPerms(str, '');
}

/**
Obtain all string permutation. Factorial recursive complexity
*/
function createPerms(str, prefix) {
  if (str.length < 1) {
    console.log(prefix);
  }
  for (var i=0; i<str.length; i++) {
    createPerms(str.slice(0, i) + str.slice(i+1), prefix + str.charAt(i));
  }
}

printAllStringPerms('saito');
