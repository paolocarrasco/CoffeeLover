var OrderService = require('../../services/order-service')
    should = require("should");

describe('OrderService', function() {
    var orderService;
    
    beforeEach(function() {
        orderService = new OrderService();
    });
    
    describe('#create()', function() {
        it('should generate an ID for the created order', function() {
            var order = {cost: 3.4, items: [{name: 'mocaccino', quantity: 2}]};
            order = orderService.create(order);
            var id = order.getId();
            id.should.match(/^\d+$/);
        });
        
        it('should generate different IDs for created orders', function() {
            var order1 = {cost: 3.4, items: {name: 'mocaccino', quantity: 2}};
            var order2 = {cost: 3.4, items: [{name: 'capuccino', quantity: 5}, {name: 'expresso', quantity: 1}]};
            order1 = orderService.create(order1);
            order2 = orderService.create(order2);
            order1.getId().should.not.be.equal(order2.getId());
        });
        
        it('should throw an error when order is null', function() {
            (function() { orderService.create(null); }).should.throwError();
        });
        
        it('should throw an error when the order is not valid', function() {
            (function() { orderService.create({}); }).should.throwError();
        });
        
    });
});