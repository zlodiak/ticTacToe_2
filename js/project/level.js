var Level = function(gameObj) { 
  var self = this;

  this.myLabel = 1;
  this.compLabel = -1;
  this.stepsCount = 0;
  this.score = 0;  
  this.gameObj = gameObj; 
  this.fieldObj = new Field(this, this.gameObj);

  this.levelScreenDisplay('body');     
  this.playerStep();
};

Level.prototype = {   

  playerStep: function() {
    var self = this;

    $('.field').on('click', function(e) {      
      var w = e.target.attributes['data-w'].value, 
          h = e.target.attributes['data-h'].value;

      switch (self.fieldObj.fieldArr[w][h]) {
        case 0:
          self.fieldObj.fieldArr[w][h] = 1;
          self.stepsCount++;          
          self.fieldObj.cellsRender();   
          if(self.checkLevelEnd(self.myLabel, self.fieldObj.fieldArr)) {
            self.gameObj.levelResultDisplay(self.checkLevelEnd(self.myLabel, self.fieldObj.fieldArr));
          } else {
            self.compStep();
          };                    
          break;
        case 1:
          console.log('В эту клету вы уже ходили');
          //self.informer.refreshMessage('В эту клету вы уже ходили', 'red');
          break;
        case -1:
          console.log('Эта клетка уже занята');
          //self.informer.refreshMessage('Эта клетка уже занята', 'red');
          break;
        default:
          console.log('Error analyze!');
          break;
      };   
    }); 
  },

  levelScreenDisplay: function(parentElementTag) {
    $('<div class="level_begin_label" id="levelBeginLabel">Уровень: ' + this.gameObj.level + '</div>').appendTo(parentElementTag);   

    setTimeout(function() { 
      $('<div class="any_key_invitation" id="anyKeyInvitation">Нажмите любую клавишу для старта</div>').appendTo('#levelBeginLabel');

      document.onkeypress = function() {
        document.onkeypress = undefined;
        $('#levelBeginLabel').remove();
      };          
    }, 1000);
  },   

  compStep: function() { 
    var self = this;
    var w, h;

    for(var i = 0; i < 100; i++) {  
      w = self.gameObj.helperObj.randomIntFromZero(3);
      h = self.gameObj.helperObj.randomIntFromZero(3);

      if(self.fieldObj.fieldArr[w][h] == 0) {  
        self.fieldObj.fieldArr[w][h] = -1;
        self.stepsCount++; 
        self.fieldObj.cellsRender(self.fieldElementId, self.fieldArr);    
        if(self.checkLevelEnd(self.compLabel, self.fieldObj.fieldArr)) {
          self.gameObj.levelResultDisplay(self.checkLevelEnd(self.compLabel, self.fieldObj.fieldArr));
        };             
        break;
      };       
    };   
  }, 

  checkLevelEnd: function(label, fieldArr) { 
    if(this.checkWin(label, fieldArr)) {
      return label;
    } 
    else if(this.checkStandoff()) {
      return 'standoff';
    };    
  },  

  checkStandoff: function() { console.log(this.stepsCount);
    if(this.stepsCount >= 9) { return 'standoff' };
  },

  checkWin: function(label, fieldArr) { 
    var winnerMark = undefined;

    // check diagonal rt-lb
    if((fieldArr[0][0] == label) && (fieldArr[1][1] == label) && (fieldArr[2][2] == label)) {
      console.log('stop');
      winnerMark = label;
    };

    // check diagonal lt-rb
    if((fieldArr[0][2] == label) && (fieldArr[1][1] == label) && (fieldArr[2][0] == label)) {
      console.log('stop');
      winnerMark = label;
    };

    // check verticals
    for(var h = 0; h <= 2; h++) {
      if((fieldArr[h][0] == label) && (fieldArr[h][1] == label) && (fieldArr[h][2] == label)) {
        console.log('stop');
        winnerMark = label;
      };
    };

    // check horizontals
    for(var w = 0; w <= 2; w++) {
      if((fieldArr[0][w] == label) && (fieldArr[1][w] == label) && (fieldArr[2][w] == label)) {
        console.log('stop');
        winnerMark = label;
      };
    }; 

    return winnerMark;
  }
};