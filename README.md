# Algorithms and Stuff in JS!
## Shortest Path
- Shortest Path Algorithm using adjacency matrix and BFS-Dijkstra
- Prints shortest distance and path
- O(l) Where l is the number of available locations in the adjacency matrix (nxm)

## Rotate Strings
- Rotate a string with substring function
- Check if a string is a rotated version of another. This algorithm works by
concating string A twice and checking if string B is a substring of the concatenated string.

## Compress Strings
- Compress a String by counting how many identical chars are sequential. Returns
that new compressed string only if the length of that result is shorter than the
original
  - aaaabbbc = 4a3b1c
  - abcd = abcd (not 1a1b1c becasue it is longer)
  - aaaaaaaab = 8a1b

## String Permutations
- Obtain all String permutations. i.e. ABC => ABC, ACB, BAC, BCA, CAB, CBA
- Recursive
- Factorial complexity
