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

  finalization: function() { 
    var fieldElem = document.getElementById(this.fieldElementId);
    fieldElem.parentNode.removeChild(fieldElem);
  },  

  fillFieldArr: function() { 
    for(var w_coord = 0; w_coord < this.width; w_coord++) {
      this.fieldArr[w_coord] = new Array();   

      for(var h_coord = 0; h_coord < this.height; h_coord++) {
        this.fieldArr[w_coord][h_coord] = 0;
      };
    };  
  }, 

  changeFieldArr: function(w_coord, h_coord, value) { 
    this.fieldArr[w_coord][h_coord] = value;
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

    document.getElementById(this.fieldElementId).innerHTML ='';

    for(var w_coord = 0; w_coord < this.width; w_coord++) for(var h_coord = 0; h_coord < this.height; h_coord++) { 
      bgImage = '';

      if(this.fieldArr[w_coord][h_coord] == 0) {
      }
      else if(this.fieldArr[w_coord][h_coord] == 1) {
        bgImage = 'images/cross.png';
      }
      else if(this.fieldArr[w_coord][h_coord] == -1) {
        bgImage = 'images/zero.png';
      };    

      $('<div class="cell" id="Cell_' + w_coord + '_' + h_coord + '" data-w="' + w_coord + '" data-h="' + h_coord + '" ></div>').css({
        background: 'url("' + bgImage + '") left top no-repeat',
        backgroundSize: 'cover',
        width: (this.cellSize - 1) + 'px',
        height: (this.cellSize -1) + 'px',
        left: (w_coord * this.cellSize) + 'px',
        top: (h_coord * this.cellSize) + 'px'
      }).appendTo('#' + this.fieldElementId);     
    };
  }  

}