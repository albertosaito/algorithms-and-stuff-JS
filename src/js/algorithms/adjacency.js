/*
This is an implementation of the shortest-path algorithm using a BFS-Dijkstra
approach.

By running this source, an adjacency matrix will be 'randomly' created (ln 19)
where obstacles are represented by null values, and initial values for valid
locations have the Number.MAX_SAFE_INTEGER value.

origin and destination coordinates can be changed on lines 14-17
*/

var _ = Number.MAX_SAFE_INTEGER;
var matrix = [];
var originRow = 0;
var originCol = 0;
var destRow = 4;
var destCol = 1;

createMaze(5,5);
//set initial to 0
matrix[originRow][originCol] = 0;
//set destination always to _
matrix[destRow][destCol] = _;

printMaze();
console.log('--------------');
var queue = [];
queue.push([originRow, originCol, 0]);
while (queue.length > 0) {
  shortestPath.apply(null, queue.shift());
}
printMaze();
console.log('--------------');
printShortestDistance(destRow,destCol);
printShortestPath(originRow,originCol,destRow,destCol);

/**
Function to randomly create a maze where null values are obstacles and
Number.MAX_SAFE_INTEGER are valid locations
*/
function createMaze (rows, cols) {
  matrix = [];
  for (var i=0; i<rows; i++) {
    var row = [];
    for (var j=0; j<cols; j++) {
      row.push(Math.random() > 0.35 ? _ : null);
    }
    matrix.push(row);
  }
}

/**
Function to print the maze
*/
function printMaze () {
  for (var i=0; i<matrix.length; i++) {
    process.stdout.write('[');
    for (var j=0; j<matrix[i].length; j++) {
      var curr = matrix[i][j];
      if (curr === _)
        curr = '_';
      else if (curr === null)
        curr = 'X';
      process.stdout.write(curr + " ");
    }
    process.stdout.write(']\n');
  }
}

/**
BFS-Dijkstra Shortest Path Algoithm implementation
*/
function shortestPath (x, y, stepCount) {
  //move right
  if ( isValidMove(x, y+1)) {
    if (matrix[x][y+1] > stepCount+1) {
      queue.push([x, y+1, stepCount+1]);
      matrix[x][y+1] = stepCount+1;
    }
  }
  //move left
  if (isValidMove(x, y-1)) {
    if (matrix[x][y-1] > stepCount+1) {
      queue.push([x, y-1, stepCount+1]);
      matrix[x][y-1] = stepCount+1;
    }
  }
  //move down
  if (isValidMove(x+1, y)) {
    if (matrix[x+1][y] > stepCount+1) {
      queue.push([x+1, y, stepCount+1]);
      matrix[x+1][y] = stepCount+1;
    }
  }
  //move up
  if (isValidMove(x-1, y)) {
    if (matrix[x-1][y] > stepCount+1) {
      queue.push([x-1, y, stepCount+1]);
      matrix[x-1][y] = stepCount+1;
    }
  }
}

/**
Check if a location [row, col] is a valid move:
  - within matrix boundaries
  - not an obstacle
*/
function isValidMove (row, col) {
  return row>=0 && row<5 && col>=0 && col<6 && matrix[row][col] !== null;
}

/**
Used after shortest path has been executed, prints the shortrest distance to the
specified row and col
*/
function printShortestDistance (row, col) {
  if (matrix[row][col] === null || matrix[row][col] === _)
    console.log('Unreachable');
  else {
    console.log(matrix[row][col]);
  }
}

/**
Walks back the shortest distance path and prints out the nodes
*/
function printShortestPath (originRow, originCol, destRow, destCol) {
  if (matrix[destRow][destCol] !== null && matrix[destRow][destCol] !== _) {
    var path = [];
    var currRow = destRow;
    var currCol = destCol;
    var stepCount = matrix[destRow][destCol];
    do {
      var node = '(' + currRow + ', ' + currCol + ')';
      path.push(node);
      //find next step
      //left?
      if (isValidMove(currRow, currCol-1) && matrix[currRow][currCol-1] === stepCount - 1)
        currCol--;
      //Right?
      else if (isValidMove(currRow, currCol+1) && matrix[currRow][currCol+1] === stepCount - 1)
        currCol++;
      //Up?
      else if (isValidMove(currRow-1, currCol) && matrix[currRow-1][currCol] === stepCount - 1)
        currRow--;
      //Down?
      else if (isValidMove(currRow+1, currCol) && matrix[currRow+1][currCol] === stepCount - 1)
        currRow++;
      stepCount--;
    }
    while (!(originRow === currRow && originCol === currCol));

    var origin = '(' + originRow + ', ' + originCol + ')';
    path.push(origin);
    console.log(path.reverse().join('->'));
  }
}
