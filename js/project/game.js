var Game = function() {
  self = this;

  this.fieldElementId = 'field';
  this.gameElementId = 'game';
  this.myMove = false;
  this.width = 3;
  this.height = 3;
  this.level = 1;
  this.score = 0;
  this.hiScore = 0;
  this.scoreValue = 1000;
  this.myLabel = 1;
  this.compLabel = -1;
  this.stepsCount = 0;
  this.fieldArr = [];
  this.cellSize = 100;

  this.init();
  this.levelsLoop();
};

Game.prototype = {

  init: function() {
    self.helper = new Helper, 
    self.field = new Field(self.gameElementId, self.cellSize),
    self.informer = new Informer(self.gameElementId, {
                          score: self.score,
                          level: self.level
                        });  
  },

  checkStateLevel: function(label) {
    self.checkWin(label);
    self.checkStandoff();
  },

  checkStandoff: function() {
    if(self.stepsCount >= 9) { self.levelResultDisplay() };
  },

  checkWin: function(label) {
    // check diagonal rt-lb
    if((self.fieldArr[0][0] == label) && (self.fieldArr[1][1] == label) && (self.fieldArr[2][2] == label)) {
      self.levelResultDisplay(label);
      self.scoreValue = 1000;
    };

    // check diagonal lt-rb
    if((self.fieldArr[0][2] == label) && (self.fieldArr[1][1] == label) && (self.fieldArr[2][0] == label)) {
      self.levelResultDisplay(label);
      self.scoreValue = 1000;
    };

    // check verticals
    for(var h = 0; h <= 2; h++) {
      if((self.fieldArr[h][0] == label) && (self.fieldArr[h][1] == label) && (self.fieldArr[h][2] == label)) {
        (self.fieldArr[1][1] == label)?self.scoreValue = 1500:self.scoreValue = 2000;
        self.informer.refreshMessage('Красивая игра', 'cyan');
        self.levelResultDisplay(label);
      };
    };

    // check horizontals
    for(var w = 0; w <= 2; w++) {
      if((self.fieldArr[0][w] == label) && (self.fieldArr[1][w] == label) && (self.fieldArr[2][w] == label)) {
        (self.fieldArr[1][1] == label)?self.scoreValue = 1500:self.scoreValue = 2000;
        self.informer.refreshMessage('Красивая игра', 'cyan');
        self.levelResultDisplay(label);
      };
    };    
  },  

  fillFieldArr: function() {
    for(var w = 0; w < self.width; w++) {
      self.fieldArr[w] = new Array(h);   

      for(var h = 0; h < self.height; h++) {
        self.fieldArr[w][h] = 0;
      };
    };   
  },

  stepsLoop: function() {   
    $('.cell').one('click', function() {
      var w = $(this).attr('data-w'), 
          h = $(this).attr('data-h')

      switch (self.fieldArr[w][h]) {
        case 0:
          self.fieldArr[w][h] = 1;
          self.stepsCount++;          
          self.field.cellsRender(self.fieldElementId, self.fieldArr);
          self.checkStateLevel(self.myLabel);
          self.compStep();                  
          break;
        case 1:
          self.informer.refreshMessage('В эту клету вы уже ходили', 'red');
          break;
        case -1:
          self.informer.refreshMessage('Эта клетка уже занята', 'red');
          break;
        default:
          // console.log('Error analyze!');
          break;
      };       

      self.stepsLoop();
    });  
  },

  compStep: function() {  
    var w, h;

    for(var i = 0; i < 100; i++) {  
      w = self.helper.randomIntFromZero(3);
      h = self.helper.randomIntFromZero(3);

      if(self.fieldArr[w][h] == 0) {  
        self.fieldArr[w][h] = -1;
        self.field.cellsRender(self.fieldElementId, self.fieldArr); 
        break;
      };
    };

    self.stepsCount++; 
    self.field.cellsRender(self.fieldElementId, self.fieldArr);
    self.checkStateLevel(self.compLabel);

    return;
  },

  levelsLoop: function() {
    self.informer.refreshHiScore(self.hiScore);
    self.stepsCount = 0;
    self.fillFieldArr();
    self.helper.levelScreenDisplay(self.level, 'body');
    self.field.cellsRender(self.fieldElementId, self.fieldArr);
    self.informer.refreshInfo({
      score: self.score,
      level: self.level
    });    
    self.stepsLoop();
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