var OrderService = require('../services/order-service');
var orders = [];

var Orders = {},
    ordersBase = '/orders',
    ordersIdUrl = '/orders/:id';

Orders.GET_URL = ordersIdUrl;
Orders.LIST_URL = ordersBase;
Orders.CREATE = ordersBase;
Orders.UPDATE = ordersIdUrl;
Orders.DELETE = ordersIdUrl;

var orderService = new OrderService();

Orders.create = function(req, res) {
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
    
Orders.get = function(req, res) {
    var order = orderService.getBy(req.params.id);
    if(order) {
        res.json(order.raw());
    }
    else {
        res.status(404);
    }
    res.end()
};

Orders.list = function(req, res) {
    res.json(orders);
};
    
Orders.update = function(req, res) {
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

Orders.delete = function(req, res) {
    var orderId = req.params.id;
    if(orderId in orders) {
        orders[orderId].status = 'removed';
    }
    else {
        res.status(404);
    }
    res.end();
};

module.exports = Orders;