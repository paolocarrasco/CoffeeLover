var _ = require('underscore');

var locations = ['takeAway', 'drinkIn'];

module.exports = function () {
    var me = this,
        _id,
        _items = [],
        _location = 'takeAway',
        _cost = 0;
        
    me.hydrateFrom = function(rawOrder) {
        if(rawOrder.id) _id = rawOrder.id;
        if(rawOrder.items) _items = rawOrder.items;
        if(rawOrder.location) _location = rawOrder.location;
        if(rawOrder.cost) _cost = rawOrder.cost;
    };
    
    me.validate = function() {
        var result = {};
        var details = {};
        var isValid = true;
        
        if(isNaN(_id)) {
            details.id = 'ID is not a number';
            isValid = false;
        }
        
        if(locations.indexOf(_location) == -1) {
            details.location = 'The location is not valid';
            isValid = false;
        }
        
        if(isNaN(_cost)) {
            details.cost = 'Cost is not a number';
            isValid = false;
        }
        
        if(!_.isArray(_items)) {
            details.items = 'It is not a valid collection of items';
            isValid = false;
        }
        
        /*
        if(_.isArray(_items)) {
            isValid = _.every(_items, function(item) {
                if(item.isValid && item.isValid()) return true;
                details.items = 'Any of the items is not valid';
                return false;
            });
        }
        else {
            details.items = 'It is not a valid collection of items';
            isValid = false;
        }
        */
        result.valid = isValid;
        result.details = details;
        return result;
    };
    
    me.getId = function() {
        return _id;
    };
    
    me.getItems = function() {
        return _items.concat();
    };
    
    me.getLocation = function() {
        return _location;
    }
    
    me.getCost = function() {
        return _cost;
    };
};

