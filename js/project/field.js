var Field = function(gameElementId, cellSize) { 
  self = this;

  this.gameElementId = gameElementId;
  this.cellSize = cellSize;
  this.fieldId = 'field';
  this.fieldArr = [];
  this.cellSize = 100; 
  this.width = 3; 
  this.height = 3;   

  this.init();
};

// Field.prototype = Object.create(Level.prototype);

Field.prototype = {

  init: function() {
    self.fillFieldArr();

    $('<div class="field" id="field"></div>').css({
      width: (self.cellSize * 3) + 'px',
      height: (self.cellSize * 3) + 'px'
    }).appendTo('#' + self.gameElementId);

    self.cellsRender(self.fieldId, self.fieldArr);
  },

  cellsDelete: function() {

  },  

  fillFieldArr: function() {
    for(var w = 0; w < self.width; w++) {
      self.fieldArr[w] = new Array();   

      for(var h = 0; h < self.height; h++) {
        self.fieldArr[w][h] = 0;
      };
    };  console.log(self.fieldArr);
  },   

  cellsRender: function(fieldId, fieldArr) {   console.log(66);
    var bgImage;

    $('#' + fieldId).html('');

    for(var w = 0; w < self.width; w++) for(var h = 0; h < self.height; h++) { 
      bgImage = '';

      if(fieldArr[w][h] == 0) {
      }
      else if(fieldArr[w][h] == 1) {
        bgImage = 'images/cross.png';
      }
      else if(fieldArr[w][h] == -1) {
        bgImage = 'images/zero.png';
      };    

      $('<div class="cell" id="Cell_' + w + '_' + h + '" data-w="' + w + '" data-h="' + h + '" ></div>').css({
        background: 'url("' + bgImage + '") left top no-repeat',
        backgroundSize: 'cover',
        width: (this.cellSize - 1) + 'px',
        height: (this.cellSize -1) + 'px',
        left: (w * this.cellSize) + 'px',
        top: (h * this.cellSize) + 'px'
      }).appendTo('#' + fieldId);      
    };
  }  

}