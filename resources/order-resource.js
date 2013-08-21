var OrderService = require('../services/order-service');
var orders = [];

var orderResource = {},
    ordersBase = '/orders',
    ordersIdUrl = '/orders/:id';

orderResource.GET_URL = ordersIdUrl;
orderResource.LIST_URL = ordersBase;
orderResource.CREATE = ordersBase;
orderResource.UPDATE = ordersIdUrl;
orderResource.DELETE = ordersIdUrl;

var orderService = new OrderService();

orderResource.create = function(req, res) {
    var order = orderService.create(req.body);
    if(order) {
        res
            .status(201)
            .location('/orders/' + order.getId())
            .json(order.raw());
    }
    else {
        res.status(304).end();
    }
};
    
orderResource.get = function(req, res) {
    var order = orderService.getBy(req.params.id);
    if(order) {
        res.json(order.raw());
    }
    else {
        res.status(404);
    }
    res.end()
};

orderResource.list = function(req, res) {
    res.json(orders);
};
    
orderResource.update = function(req, res) {
    var orderId = req.params.id;
    if(orderId in orders) {
        var updatedOrder = req.body;
        var order = orders[orderId];
        for(var property in updatedOrder) {
            if(property in order) {
                order[property] = updatedOrder[property];
            }
        }
    }
    else {
        res.status(404);
    }
    res.end();
};

orderResource.delete = function(req, res) {
    var orderId = req.params.id;
    if(orderId in orders) {
        orders[orderId].status = 'removed';
    }
    else {
        res.status(404);
    }
    res.end();
};

module.exports = orderResource;