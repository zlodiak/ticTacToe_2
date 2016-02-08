var Informer = function(gameObj) { 
  this.messageCount = 0;
  this.informerElementId = 'informer'; 
  this.hiScoreElementId = 'hiScore'; 
  this.messagerElementId = 'messager'; 
  this.levelValueId = 'levelValue'; 
  this.scoreValueId = 'scoreValue'; 
  this.hiScoreValueId = 'hiScoreValue'; 

  this.gameObj = gameObj; 

  this.create(this.gameObj.gameElementId, this.informerElementId, this.levelValueId, this.scoreValueId);
  this.refreshHiScore(this.gameObj.hiScore);
  this.refreshMessage('Игра началась. Ваш ход', 'orange');
  this.refreshInfo(this.scoreValueId, this.levelValueId, {'score': this.gameObj.score, 'level': this.gameObj.level });
};

Informer.prototype = {

  finalization: function(hiScore) {
    var informerElem = document.getElementById(this.informerElementId),
        hiScoreElem = document.getElementById(this.hiScoreElementId),
        messagerElem = document.getElementById(this.messagerElementId);

    informerElem.parentNode.removeChild(informerElem);
    hiScoreElem.parentNode.removeChild(hiScoreElem);  
    messagerElem.parentNode.removeChild(messagerElem);      
  },  

  create: function(gameElementId, informerElementId, levelValueId, scoreValueId) { 
    $('<table class="informer" id="' + informerElementId + '"> \
        <tr><td class="label level_label">уровень: </td><td class="value level_value" id="' + levelValueId + '"></td></tr> \
        <tr><td class="label score_label">счёт: </td><td class="value score_value" id="' + scoreValueId + '"></td></tr> \
      </table>').appendTo('#' + gameElementId);  

    $('<div class="messager" id="messager"></div>').appendTo('#' + this.gameObj.gameElementId); 

    $('<div class="hi_score" id="hiScore">Рекордный счёт: <span class="hi_score_value" id="hiScoreValue"></div>').appendTo(this.gameObj.parentGameElementTag);
  },   

  refreshHiScore: function(hiScore) {
    document.getElementById(this.hiScoreValueId).innerHTML = hiScore;
  },

  refreshMessage: function(message, textColor) {
    $('<div class="message_unit" id="messageUnit_' + this.messageCount + '" >' + message + '</div>').css({
      color: textColor
    }).appendTo('#messager');

    setTimeout(function() { 
      $('#messager div:first-child').remove();
    }, 3000);

    this.messageCount++;    
  },

  refreshInfo: function(scoreValueId, levelValueId, infoArr) {
    document.getElementById(scoreValueId).innerHTML = infoArr['score'];
    document.getElementById(levelValueId).innerHTML = infoArr['level'];
  }  

}