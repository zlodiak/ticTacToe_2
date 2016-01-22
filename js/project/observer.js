var CellsObserver = function(){
    this.handlers = [];
}
 
CellsObserver.prototype = {

    subscribe: function(cellObject) {
        this.handlers.push(cellObject);
    },
 
    unsubscribe: function(cellObject) {
        this.handlers = this.handlers.filter(
            function(bullet) {
                if (bullet !== cellObject) {
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