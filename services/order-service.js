var _ = require("underscore"),
    o = require("../utils/object-utils"),
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
        var orderFound = _.find(orders, function(order) { return order.getId() == id});
        return orderFound;
    };
    
    me.list = function() {
        return _.toArray(orders);
    };
    
    me.delete = function(id) {
        var order = _.find(orders, function (order) {
            return order.getId() == id;
        });
        
        if(!order) return null;
        
        var position = orders.indexOf(order);
        
        orders.splice(position, 1);
        
        return order;
    };
    
};
module.exports = OrderService;