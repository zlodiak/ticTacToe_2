var Game = function() {
  this.parentGameElementTag = 'body';
  this.gameElementId = 'game';
  this.level = 1;
  this.hiScore = 0;
  this.score = 0;    
  this.myLabel = 1;
  this.compLabel = -1;
    
  this.helperObj = new Helper();  
  this.startNewLevel(); 
};

Game.prototype = {

  startNewLevel: function() { 
    var self = this;

    if(self.levelObj) {
      self.levelObj.finalization();
      delete self.levelObj;      
    };

    self.levelObj = new Level(self);           
  },

  levelResultDisplay: function(winner) { 
    var self = this;

    console.log(self + 'winer: ' + winner);  

    self.levelObj.stepsOff(); 

    setTimeout(function() {
      if(winner == self.myLabel) {  console.log('you');
        self.level += 1;
      } 
      else if(winner == self.compLabel) { console.log('comp');
        self.level = 1;
      } else {  console.log('std off');
        self.level = self.level;        
      };

      self.startNewLevel(); 
    }, 2000);    
  }

};


