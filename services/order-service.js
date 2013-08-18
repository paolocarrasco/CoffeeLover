var _ = require('underscore'),
    Order = require('../models/order');

var OrderService = function() {
    var me = this;
    var lastId = 0;
    
    me.create = function(rawOrder) {
        if(!rawOrder) throw new Error('The order is missing');
        var order = new Order();
        order.hydrateFrom(rawOrder);
        var validationResult = _.isFunction(order.validate) && order.validate();
        if(!validationResult || !validationResult.valid) {
            var details = validationResult.details;
            var errorMessage = 'The order is not valid';
            if(details) {
                for(var name in details) {
                    errorMessage.concat('. Details: \n' + details[name]);
                }
            }
            throw new Error(errorMessage);
        }
        order.setId(++lastId);
        return order;
    };
};
module.exports = OrderService;