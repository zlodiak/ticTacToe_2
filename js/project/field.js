var Field = function(levelObj, gameObj) { 
  var self = this;

  this.gameObj = gameObj;   
  this.levelObj = levelObj;   
  this.fieldArr = [];  
  this.fieldElementId = 'field';   
  this.cellSize = 100; 
  this.width = 3; 
  this.height = 3;    

  this.fillFieldArr();
  this.fieldElementCreate();
  this.cellsRender();
};

Field.prototype = {

  fillFieldArr: function() { 
    for(var w = 0; w < this.width; w++) {
      this.fieldArr[w] = new Array();   

      for(var h = 0; h < this.height; h++) {
        this.fieldArr[w][h] = 0;
      };
    };  
  },    

  cellDelete: function() {

  },  

  fieldElementCreate: function() { 
    var gameElement = $('#' + this.gameObj.gameElementId);

    $('<div class="field" id="field"></div>').css({
      width: (this.cellSize * 3) + 'px',
      height: (this.cellSize * 3) + 'px'
    }).appendTo(gameElement);
  },    

  cellsRender: function() { 
    var bgImage;

    $('#' + this.fieldElementId).html('');

    for(var w = 0; w < this.width; w++) for(var h = 0; h < this.height; h++) { 
      bgImage = '';

      if(this.fieldArr[w][h] == 0) {
      }
      else if(this.fieldArr[w][h] == 1) {
        bgImage = 'images/cross.png';
      }
      else if(this.fieldArr[w][h] == -1) {
        bgImage = 'images/zero.png';
      };    

      $('<div class="cell" id="Cell_' + w + '_' + h + '" data-w="' + w + '" data-h="' + h + '" ></div>').css({
        background: 'url("' + bgImage + '") left top no-repeat',
        backgroundSize: 'cover',
        width: (this.cellSize - 1) + 'px',
        height: (this.cellSize -1) + 'px',
        left: (w * this.cellSize) + 'px',
        top: (h * this.cellSize) + 'px'
      }).appendTo('#' + this.fieldElementId);     
    };
  }  

}