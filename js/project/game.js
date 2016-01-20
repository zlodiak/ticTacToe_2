var Game = function(parentGameElementTag) {
  self = this;

  this.parentGameElementTag = parentGameElementTag;
  this.gameElementId = 'game';
  this.level = 1;
  this.score = 0;
  this.hiScore = 0;
  this.scoreValue = 1000;
  this.myLabel = 1;
  this.compLabel = -1;
  this.stepsCount = 0;
  this.gameState =0;

  this.init();
};

Game.prototype = {

  init: function() {
    $('<div class="game" id="' + self.gameElementId + '"></div>').prependTo(self.parentGameElementTag);
    self.levelObj = new Level(self.gameElementId, self.level);    
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


