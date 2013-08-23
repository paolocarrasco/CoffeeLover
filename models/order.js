var _ = require('underscore'),
    Item = require('./item');

var locations = ['TakeAway', 'DrinkIn']

var Order = function () {

    var me = this,
        _id,
        _items = [],
        _location = locations[0],
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
        
        if(_id && isNaN(_id)) {
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
        
        if(_items.length) {
            var validItems = _.all(_items, function(item) {
                var validationResult = item.validate();
                if(validationResult.valid) {
                    return true;
                }
                details.items = 'Any of the items is not valid';
                return false;
            });
            
            if(!validItems) isValid = false;
        } 
        else {
            details.items = 'The order should have at least an item';
            isValid = false;
        }
        
        result.valid = isValid;
        result.details = details;
        return result;
    };
    me.setId = function(id) {
        _id = id;
    };
    
    me.getId = function() {
        return _id;
    };
    
    me.getItems = function() {
        return _items.concat();
    };
    
    me.getLocation = function() {
        return _location;
    };
    
    me.setLocation = function(location) {
        _location = location;
    };
    
    me.getCost = function() {
        return _cost;
    };
    
    me.setCost = function(cost) {
        _cost = cost;
    };
    
    me.raw = function() {
        return {
            id: _id,
            cost: _cost,
            location: _location,
            items: _.map(_items, function(item) { return item.raw(); })
        };
    };
};

Order.TAKE_AWAY = locations[0];
Order.DRINK_IN = locations[1];

module.exports = Order;