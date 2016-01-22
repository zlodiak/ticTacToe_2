var CellsObserver = function(){
    this.handlers = [];
}
 
CellsObserver.prototype = {

    subscribe: function(bulletObject) {
        this.handlers.push(bulletObject);
    },
 
    unsubscribe: function(bulletObject) {
        this.handlers = this.handlers.filter(
            function(bullet) {
                if (bullet !== bulletObject) {
                    return bullet;
                }
            }
        );
    },
 
    action: function(){
        this.handlers.forEach(function(bullet){
            bullet.Move();
        });
    }
}