var Level = function(gameObj) { 
  var self = this;

  this.gameObj = gameObj; 
  this.stepsCount = 0;
  
  this.fieldObj = new Field(this, this.gameObj);
  this.gameObj.levelScreenDisplay('body', this.gameObj.level);     
  this.stepsPlayerOn();
};

Level.prototype = {   

  finalization: function() { 
    this.fieldObj.finalization();
    delete this.fieldObj;
  },

  stepsPlayerOn: function() { 
    var self = this;

    $('.field').on('click', function(e) {      
      var w_coord = e.target.attributes['data-w'].value, 
          h_coord = e.target.attributes['data-h'].value, 
          resultLevel;

      switch (self.fieldObj.fieldArr[w_coord][h_coord]) {
        case 0:
          self.fieldObj.changeFieldArr(w_coord, h_coord, self.gameObj.playerLabel);
          self.stepsCount++;          
          self.fieldObj.cellsRender();  

          resultLevel = self.checkLevelEnd(self.gameObj.playerLabel, self.fieldObj.fieldArr);  

          if(resultLevel) {
            self.gameObj.numLevelCompute(self.checkLevelEnd(self.gameObj.playerLabel, self.fieldObj.fieldArr));
            self.scoreCalculated(resultLevel);                     
            self.stopLevel();            
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
    var w_coord, h_coord, resultLevel;

    for(var i = 0; i < 1000; i++) {  
      w_coord = self.gameObj.helperObj.randomIntFromZero(3);
      h_coord = self.gameObj.helperObj.randomIntFromZero(3);

      if(self.fieldObj.fieldArr[w_coord][h_coord] == 0) {  
        self.fieldObj.changeFieldArr(w_coord, h_coord, self.gameObj.compLabel);
        self.stepsCount++; 
        self.fieldObj.cellsRender(self.fieldElementId, self.fieldArr);  

        resultLevel = self.checkLevelEnd(self.gameObj.compLabel, self.fieldObj.fieldArr);

        if(resultLevel) {
          self.gameObj.numLevelCompute(self.checkLevelEnd(self.gameObj.compLabel, self.fieldObj.fieldArr));
          self.scoreCalculated(resultLevel);                     
          self.stopLevel();                     
        };   

        break;
      };       
    };   
  }, 

  scoreCalculated: function(resultLevel) { 
    var self = this;

    if(resultLevel == self.gameObj.compLabel) {
      if(self.gameObj.score > self.gameObj.hiScore) {
        self.gameObj.hiScore = self.gameObj.score;
      };      
      self.gameObj.score = 0;
    } else if(resultLevel == self.gameObj.playerLabel) {
      self.gameObj.score += 500;
    } else if(resultLevel == 'standoff') {
      self.gameObj.score += 100;
    };
  },

  stopLevel: function() { 
    var self = this;

    $('.field').off('click');   

    setTimeout(function() {
      self.gameObj.startNewLevel();
    }, 2000);  
  },  

  checkLevelEnd: function(label, fieldArr) { 
    var result = undefined;

    if(this.checkWin(label, fieldArr)) {
      result = label;
    } 
    else if(this.checkStandoff()) {
      result = 'standoff';
    };    

    return result;
  },  

  checkStandoff: function() { 
    if(this.stepsCount >= 9) { return 'standoff' };
  },

  checkWin: function(label, fieldArr) { 
    var winnerMark = undefined;

    // check diagonal rt-lb
    if((fieldArr[0][0] == label) && (fieldArr[1][1] == label) && (fieldArr[2][2] == label)) {
      winnerMark = label;
    };

    // check diagonal lt-rb
    if((fieldArr[0][2] == label) && (fieldArr[1][1] == label) && (fieldArr[2][0] == label)) {
      winnerMark = label;
    };

    // check verticals
    for(var h_coord = 0; h_coord <= 2; h_coord++) {
      if((fieldArr[h_coord][0] == label) && (fieldArr[h_coord][1] == label) && (fieldArr[h_coord][2] == label)) {
        winnerMark = label;
      };
    };

    // check horizontals
    for(var w_coord = 0; w_coord <= 2; w_coord++) {
      if((fieldArr[0][w_coord] == label) && (fieldArr[1][w_coord] == label) && (fieldArr[2][w_coord] == label)) {
        winnerMark = label;
      };
    }; 

    return winnerMark;
  }
};