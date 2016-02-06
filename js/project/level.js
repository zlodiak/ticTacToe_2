var Level = function(gameObj) { 
  var self = this;

  this.gameObj = gameObj; 
  this.stepsCount = 0;
  
  this.fieldObj = new Field(this, this.gameObj);
  this.gameObj.levelScreenDisplay('body');     
  this.playerStep();
};

Level.prototype = {   

  finalization: function() { 
    this.fieldObj.finalization();
    delete this.fieldObj;
  },

  stepsOff: function() { 
    $('.field').off('click');   
  },

  playerStep: function() {
    var self = this;

    $('.field').on('click', function(e) {      
      var w = e.target.attributes['data-w'].value, 
          h = e.target.attributes['data-h'].value,
          nextLevel;

      switch (self.fieldObj.fieldArr[w][h]) {
        case 0:
          self.fieldObj.fieldArr[w][h] = 1;
          self.stepsCount++;          
          self.fieldObj.cellsRender();   
          if(self.checkLevelEnd(self.gameObj.playerLabel, self.fieldObj.fieldArr)) {
            self.stepsOff(); 
            nextLevel = self.gameObj.nextLevelCompute(self.checkLevelEnd(self.gameObj.playerLabel, self.fieldObj.fieldArr));
            self.gameObj.startNewLevel();
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

  compStep: function() { 
    var self = this;
    var w, h, nextLevel;

    for(var i = 0; i < 100; i++) {  
      w = self.gameObj.helperObj.randomIntFromZero(3);
      h = self.gameObj.helperObj.randomIntFromZero(3);

      if(self.fieldObj.fieldArr[w][h] == 0) {  
        self.fieldObj.fieldArr[w][h] = -1;
        self.stepsCount++; 
        self.fieldObj.cellsRender(self.fieldElementId, self.fieldArr);    
        if(self.checkLevelEnd(self.gameObj.compLabel, self.fieldObj.fieldArr)) {
          self.stepsOff(); 
          nextLevel = self.gameObj.nextLevelCompute(self.checkLevelEnd(self.gameObj.compLabel, self.fieldObj.fieldArr));
          self.gameObj.startNewLevel();
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