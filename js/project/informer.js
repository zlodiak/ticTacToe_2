var Informer = function(parentElement, infoArr) {   
  $('<table class="informer" id="informer"> \
      <tr><td class="label level_label">уровень: </td><td class="value level_value" id="levelValue"></td></tr> \
      <tr><td class="label score_label">счёт: </td><td class="value score_value" id="scoreValue"></td></tr> \
    </table>').appendTo('#' + parentElement);  

  $('<div class="messager" id="messager"></div>').appendTo('#' + parentElement); 

  $('<div class="hi_score" id="hiScore">Рекордный счёт: <span class="hi_score_value" id="hiScoreValue"></div>').appendTo('body'); 

  this.refreshMessage('Игра началась', 'orange');
  this.refreshInfo(infoArr);
  this.messageCount = 0;
};

Informer.prototype = {

  refreshHiScore: function(hiScore) {
    $('#hiScoreValue').text(hiScore);
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

  refreshInfo: function(infoArr) {
    $('#scoreValue').text(infoArr['score']);
    $('#levelValue').text(infoArr['level']);
  }  

}