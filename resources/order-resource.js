var _ = require("underscore"),
    OrderService = require("../services/order-service");

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
    var orderId = req.params.id;
    var order = orderService.getBy(orderId);
    if(order) {
        res.json(order.raw());
    }
    else {
        res.status(404);
    }
    res.end()
};

orderResource.list = function(req, res) {
    var orders = orderService.list();
    // TODO it would be better to move this to another object
    orders = _.map(orders, function(order) { return order.raw(); });
    res.json(orders);
};

orderResource.update = function(req, res) {
    var orderId = req.params.id;
    var updatedOrder = req.body;
    if(updatedOrder) updatedOrder.id = orderId;
    var order = orderService.update(updatedOrder)
    if(order) {
        res.json(order.raw());
    }
    else {
        res.status(404);
    }
    res.end();
};

orderResource.delete = function(req, res) {
    var orderId = req.params.id;
    var order = orderService.delete(orderId);
    if(order) {
        res.json(order.raw());
    }
    else {
        res.status(404);
    }
    res.end();
};
module.exports = orderResource;
