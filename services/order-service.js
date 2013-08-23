require("../utils/string-utils");

var _ = require("underscore"),
    Order = require("../models/order");

var OrderService = function() {
    var me = this;
    var lastId = 0;
    var orders = [];
    
    me.create = function(rawOrder) {
        if(!rawOrder) throw new Error('The order intended to create is missing');
        
        var order = new Order();
        order.hydrateFrom(rawOrder);
        
        var validationResult = order.validate();
        
        if(!validationResult.valid) {
            var details = validationResult.details;
            var errorMessage = 'The order intended to create is not valid';
            if(details) {
                for(var name in details) {
                    errorMessage.concat('. Details: \n' + details[name]);
                }
            }
            throw new Error(errorMessage);
        }
        
        order.setId(++lastId);
        orders.push(order);
        
        return order;
    };
    
    me.getBy = function(id) {
        if(!id) throw new Error('The ID of the order to retrieve should have a value');
        var orderFound = findById(id);
        return orderFound;
    };
    
    me.list = function() {
        return _.toArray(orders);
    };
    
    me.delete = function(id) {
        var order = findById(id);
        
        if(!order) return null;
        
        var position = orders.indexOf(order);
        
        orders.splice(position, 1);
        
        return order;
    };
    
    me.update = function(updatedRawOrder) {
        if(!updatedRawOrder) throw new Error('The received order is null');
        var order = findById(updatedRawOrder.id);
        
        for(var property in updatedRawOrder) {
            if('set' + property.capitalize() in order) {
                order['set' + property.capitalize()](updatedRawOrder[property]);
            }
        }
        
        return order;
    };
    
    function findById(id) {
        return _.find(orders, function (order) {
            return order.getId() == id;
        });
    }
};

module.exports = OrderService;