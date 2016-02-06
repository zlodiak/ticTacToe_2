var Game = function() {
  this.parentGameElementTag = 'body';
  this.gameElementId = 'game';
  this.level = 1;
  this.hiScore = 0;
  this.scoreValue = 1000;
  this.stepsCount = 0;
  this.gameState = 0; 
  this.helperObj = new Helper();  
  this.levelObj = new Level(this);   
};

Game.prototype = {

  init: function() {  
  
  },

  levelResultDisplay: function(winner) { console.log('lrd');
    console.log('winer: ' + winner);       
  }

};


