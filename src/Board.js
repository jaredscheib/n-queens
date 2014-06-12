// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //

    // Inputs:
    // Outputs:
    // Known:
    // Const:

    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // Input: number (of row)
      // Outputs: true if conflict in row, false if no conflict
      // Known: conflict is when there is at least one 1 in row
      // Known: 0 or 1 in each position of board to start with

      // create variable to tally 1s in row
      var hasConflict = false;
      var tally = 0;
      // store row temporarily
      var tempRow = this.get(rowIndex);
      // iterate through elements in row
      for( var i = 0; i < tempRow.length; i++ ){
        // add up element values
        tally += tempRow[i];
      }

      // if tally is greater than 1
      if( tally > 1 ){
        hasConflict = true;
      // else
      }else{
        hasConflict = false;
      }
      return hasConflict;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get an array of rows
      var rows = this.rows();
      // For each row
      for(var i = 0; i < rows.length; i++){
        // if row has a conflict
        if(this.hasRowConflictAt(i)){
        // return true;
          return true;
        }
      }
      // return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // create var for tally
      var tally = 0;
      // get rows
      var rows = this.rows();
      // iterate over each row
      for(var i = 0; i < rows.length; i++){
        // add item at row colIndex to tally
        tally += rows[i][colIndex];
        // check if tally > 1
        if(tally > 1){
          // return true
          return true;
        }
      }
      // return false
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var totalCols = this.rows().length;
      for(var i = 0; i < totalCols; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // create starting row variable
      var startRow;
      // create starting column variable
      var startCol;
      // create start of loop variable
      var index;
      // create tally variable
      var tally = 0;
      // create rows variable
      var rows = this.rows();
      // if input is less than 0
      console.log('major: ', majorDiagonalColumnIndexAtFirstRow);
      if( majorDiagonalColumnIndexAtFirstRow < 0 ){
        // set starting row to absolute value of input
        startRow = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        console.log('startRow: ', startRow);
        // set starting column to 0
        startCol = 0;
        // set start of loop to starting row value
        index = startRow;
      // else (if input is greater than or equal to 0)
      }else{
        // set starting column to input
        startCol = majorDiagonalColumnIndexAtFirstRow;
        console.log('startCol: ', startCol);
        // set starting row to 0
        startRow = 0;
        // set start of loop to starting column value
        index = startCol;
      }
      // iterate from start of loop to n (rows.length)
      for( index; index < rows.length; index++ ){
        // add value at board's [row][column] to tally
        tally += rows[startRow][startCol];
        // increment starting row
        startRow++;
        // increment starting column
        startCol++;
      }
      // return true if tally is greater than 1 (conflict), else false
      if( tally > 1 ){
        return true;
      }else{
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.rows().length;
      for(var i = (-n + 2); i <= n - 2; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var startRow;
      var startCol;
      var tally = 0;
      var rows = this.rows();

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

















