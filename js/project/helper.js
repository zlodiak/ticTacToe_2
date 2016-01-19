var Helper = function() {
  this.randomIntFromZero = function(maxExclusive) {
    return Math.floor(Math.random() * (maxExclusive));
  };  

  this.levelScreenDisplay = function(level, parentElementTag) {
    $('<div class="level_begin_label" id="levelBeginLabel">Уровень: ' + level + '</div>').appendTo(parentElementTag);   

    setTimeout(function() { 
      $('<div class="any_key_invitation" id="anyKeyInvitation">Нажмите любую клавишу для старта</div>').appendTo('#levelBeginLabel');

      document.onkeypress = function() {
        document.onkeypress = undefined;
        $('#levelBeginLabel').remove();
      };          
    }, 1000);
  };         
};

