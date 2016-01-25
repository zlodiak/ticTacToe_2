var Game = function() {
  this.parentGameElementTag = 'body';
  this.gameElementId = 'game';
  this.level = 1;
  this.score = 0;
  this.hiScore = 0;
  this.scoreValue = 1000;
  this.myLabel = 1;
  this.compLabel = -1;
  this.stepsLabel = this.myLabel;
  this.stepsCount = 0;
  this.gameState = 0;
  this.levelObj = new Level(this);  

  this.gameLoop();
};

Game.prototype = {

  gameLoop: function() { 
    self = this; 

    this.level = new Level(this);   

    $("#game .cell").each(function(indx, element) {
      var id = $(element).attr('id'), 
          w = $(element).attr('data-w'),
          h = $(element).attr('data-h');

      $('#' + id).on('click', function() { 
        $(this).off('click');
        self.gameStep(w, h, id);
      });       
    });
  },

  gameStep: function(w, h, id) {  
    console.log('gameStep');

    this.levelObj.stepsCount++;  

    if(this.stepsLabel == this.myLabel) {
      console.log('myStep');
      this.stepsLabel = this.compLabel;
      self.levelObj.fieldObj.cellsDelete(id); 
      self.levelObj.fieldObj.cellRender(w, h); 
    }
    else if(this.stepsLabel == this.compLabel) {
      console.log('compStep');
      this.stepsLabel = this.myLabel;
    };

  },

  compStep: function() {  
    var w, h;

    for(var i = 0; i < 100; i++) {  
      w = self.helperObj.randomIntFromZero(3);
      h = self.helperObj.randomIntFromZero(3);

      console.log(w);

      if(self.fieldArr[w][h] == 0) {  
        self.fieldArr[w][h] = -1;
        self.stepsCount++;         
        self.fieldObj.cellsRender(); 
        break;
      };
    };
    
    //self.checkStateLevel(self.compLabel);

    return;
  }, 

  levelsLoop: function() {
    //self.informer.refreshHiScore(self.hiScore);
    self.level = new Level(self.gameElementId); 

    while (1 == 1) {  console.log(44);
      self.level.levelScreenDisplay();

      if(self.playerState == -1) {  console.log('end ' + self.playerState);
        self.playerState == 0;
        self.level = 1;
        this.hiScore = this.scoreValue;
        self.levelsLoop();
      }
      else if(self.playerState == 1) {  console.log('end ' + self.playerState);
        self.playerState == 0;
        self.level++;
        self.levelsLoop();
      };
    };    
  },   

  levelResultDisplay: function(label) {
    var message;

    if(label == self.myLabel) {
      self.score += self.scoreValue;
      self.level++;
      message = 'Вы выиграли!';
    }
    else if(label == self.compLabel) {
      self.hiScore = self.score;
      self.score = 0;
      self.level = 1;
      message = 'Вы проиграли...';
    }else{
      self.score += 500;
      message = 'Ничья';
    };

    self.informer.refreshInfo({
      score: self.score
    });
    self.informer.refreshMessage(message);
    setTimeout(function() { self.levelsLoop() }, 3000);        
  }

};


