module.exports = function () {
    var me = this;
    
    var _name,
        _quantity = 0,
	    _milk = null,
	    _size = null;
	
    me.hydrateFrom = function(rawItem) {
        if(rawItem.name) _name = rawItem.name;
        if(rawItem.quantity) _quantity = rawItem.quantity;
        if(rawItem.milk) _milk = rawItem.milk;
	    if(rawItem.size) _size = rawItem.size;
    };
    
    me.getName = function() {
        return _name;
    };
    
    me.getQuantity = function() {
        return _quantity;
    };
    
    me.getMilk = function() {
        return _milk;
    };
    
    me.getSize = function() {
        return _size;
    };
}