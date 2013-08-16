var Order = require('models/order');
var orders = [];

var ordersBase = '/orders';
var ordersIdUrl = '/orders/:id'

exports.GET_URL = ordersIdUrl;
exports.LIST_URL = ordersBase;
exports.CREATE = ordersBase;
exports.UPDATE = ordersIdUrl;
exports.DELETE = ordersIdUrl;

exports.create = function(req, res) {
    req.body;
    var order = new Order();
    orders.push(order);
    res
        .status(201)
        .end();
};
    
exports.get = function(req, res) {
    var orderId = req.params.id;
    if(orderId in orders) {
        var order = orders[orderId];
        res.json(order);
    }
    else {
        res.status(404);
    }
    res.end()
};

exports.list = function(req, res) {
        res.json(orders);
    };
    
exports.update = function(req, res) {
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
}

exports.delete = function(req, res) {
    var orderId = req.params.id;
    if(orderId in orders) {
        orders[orderId].status = 'removed';
    }
    else {
        res.status(404);
    }
    res.end();
}