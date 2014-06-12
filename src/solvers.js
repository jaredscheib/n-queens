/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // Input: number of rows columns and rooks
  // Output: a matrix of a solution
  // Known: rooks represented as 1's
  //        only building and returning solution matrix
  //        could use board helper funcs but we won't
  // Const:

  // create nxn matrix (arrays within array)
  var solution = [];
  // add n empty rows to solution
  for( var i = 0; i < n; i++ ){
    solution.push([]);
  }
  // for each position
  for( var rowIndex = 0; rowIndex < n; rowIndex++ ){
    for( var colIndex = 0; colIndex < n; colIndex++ ){
      // if no rook at position
      if( (solution[rowIndex][colIndex] === undefined) || (solution[rowIndex][colIndex] !== 0) ){
        // push 1 (rook) to corresponding matrix position ([row][column])
        solution[rowIndex][colIndex] = 1;
        var tempRowIndex = rowIndex;
        var tempColIndex = colIndex;
        for( tempRowIndex++; tempRowIndex < n; tempRowIndex++ ){
          // place 0 (conflict-prevention) at every other position in row
          solution[tempRowIndex][tempColIndex] = 0;
        }
        tempRowIndex = rowIndex;
        for( tempColIndex++; tempColIndex <  n; tempColIndex++ ){
          // place 0 (conflict-prevention) at every other position in column
          solution[tempRowIndex][tempColIndex] = 0;
        }
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution matrix
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // INPUT: n (representing the dimensions of square board and number of rooks)
  // OUTPUT: the total number of solutions possible (for an nxn board with n rooks)
  // KNOWN: need to iterate over start positions on test boards
  // KNOWN: need a tally of all working solutions of test boards
  // UNKNOWN:
  // CONSTRAINTS:
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
