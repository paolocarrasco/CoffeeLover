var _ = require('underscore'),
    Item = require('./item');

var locations = ['takeAway', 'drinkIn'];

module.exports = function () {
    var me = this,
        _id,
        _items = [],
        _location = 'takeAway',
        _cost = 0;
        
    me.hydrateFrom = function(rawOrder) {
        var rawItems = rawOrder.items;
        
        if(rawOrder.id) _id = rawOrder.id;
        if(rawItems) {
            if(!_.isArray(rawItems)) 
                rawItems = [rawItems];
            
            var items = [];
            _.each(rawItems, function(rawItem)  {
                var item = new Item();
                item.hydrateFrom(rawItem);
                items.push(item);
            });
            _items = items;
        }
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
        
        if(_items) {
            isValid = isValid && _.all(_items, function(item) {
                var validationResult = item.validate();
                if(validationResult.valid) {
                    return true;
                }
                details.items = 'Any of the items is not valid';
                return false;
            });
        }
        
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

