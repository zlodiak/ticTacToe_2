var Level = function(gameObj) { 
  var self = this;

  this.gameObj = gameObj; 
  this.levelScreenDisplay('body');  
  this.fieldObj = new Field(this, this.gameObj);
};

Level.prototype = {

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

  stepsLoop: function() {   
    $('.cell').one('click', function() {
      var w = $(this).attr('data-w'), 
          h = $(this).attr('data-h')

      switch (self.fieldArr[w][h]) {
        case 0:
          self.fieldArr[w][h] = 1;
          self.stepsCount++;          
          self.field.cellsRender(self.fieldElementId, self.fieldArr);
          //this.checkStateLevel(self.myLabel);
          this.compStep();                  
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
  }  

  //this.cellsObserver = new CellsObserver();
  //this.fieldObj = new Field(this.gameElementId, this.cellSize);

/*  this.helper = new Helper, 
  this.informer = new Informer(this.gameElementId, {
                        score: this.score,
                        level: this.level
                      });   
  this.field = new Field(this.gameElementId, this.cellSize),

  this.fillFieldArr();

  this.field.cellsRender(self.fieldElementId, self.fieldArr);  

  self.informer.refreshInfo({
    score: self.score,
    level: self.level
  });      

  this.stepsLoop(); */  
};