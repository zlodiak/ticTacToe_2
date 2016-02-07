var Game = function() {
  this.parentGameElementTag = 'body';
  this.gameElementId = 'game';
  this.level = 1;
  this.hiScore = 0;
  this.score = 0;    
  this.playerLabel = 1;
  this.compLabel = -1;
    
  this.helperObj = new Helper();  
  this.startNewLevel(); 
};

Game.prototype = {

  startNewLevel: function() { 
    var self = this;

    console.log(self.hiScore);
    console.log(self.score);

    if(self.levelObj) {
      self.levelObj.finalization();
      delete self.levelObj;      
    };

    self.levelObj = new Level(self);           
  },

  levelScreenDisplay: function(parentElementTag, level) {
    $('<div class="level_begin_label" id="levelBeginLabel">Уровень: ' + level + '</div>').appendTo(parentElementTag);   

    setTimeout(function() { 
      $('<div class="any_key_invitation" id="anyKeyInvitation">Нажмите любую клавишу для старта</div>').appendTo('#levelBeginLabel');

      document.onkeypress = function() {
        document.onkeypress = undefined;
        $('#levelBeginLabel').remove();
      };          
    }, 1000);
  },     

  numLevelCompute: function(winner) { 
    var self = this;   

    if(winner == self.playerLabel) {  console.log('you');
      self.level += 1;
    } 
    else if(winner == self.compLabel) { console.log('comp');
      self.level = 1;
    };  


  }

};


