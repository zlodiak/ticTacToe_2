var Field = function(gameElementId, cellSize) { 
  this.cellSize = cellSize;

  $('<div class="field" id="field"></div>').css({
    width: (cellSize * 3) + 'px',
    height: (cellSize * 3) + 'px'
  }).appendTo('#' + gameElementId);
};

Field.prototype = {

  cellsDelete: function() {

  },  

  cellsRender: function(fieldId, fieldArr) {  
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