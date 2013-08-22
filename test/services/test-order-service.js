var _ = require("underscore"),
    o = require("../../utils/object-utils"),
    OrderService = require("../../services/order-service");

var orderExample = {cost: 3.4, items: {name: 'mocaccino', quantity: 2}};
        
describe('OrderService', function() {
    var orderService;
    
    beforeEach(function() {
        orderService = new OrderService();
    });
    
    describe('#create()', function() {

        it('should generate an ID for the created order', function() {
            var order = orderExample;
            order = orderService.create(orderExample);
            var id = order.getId();
            id.should.match(/^\d+$/);
        });
        
        it('should generate different IDs for created orders', function() {
            var order1 = _.extend(orderExample);
            var order2 = _.extend(orderExample);
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
    
    describe('#getBy(id)', function() {

        var baseOrder;

        beforeEach(function() {
            baseOrder = orderService.create(orderExample);
        });
        
        it('should be able to retrieve an order afterwards', function() {
            var order = orderService.getBy(baseOrder.getId());
            order.getId().should.be.equal(baseOrder.getId());
            order.getCost().should.be.equal(baseOrder.getCost());
            order.getItems().should.have.length(baseOrder.getItems().length);
        });
        
        it('should return null when the order ID is not found', function() {
            var order = orderService.getBy(5);
            should.not.exist(order);
        });
        
        it('should throw an error when the order ID is null or empty', function() {
            (function() { orderService.getBy(null); }).should.throwError();
            (function() { orderService.getBy(''); }).should.throwError();
        });
        
    });
    
    describe('#list()', function() {
        
        beforeEach(function() {
            orderService.create(orderExample);
            orderService.create(orderExample);
        });
        
        it('should gather all the elements stored', function () {
            var orders = orderService.list();
            orders.should.have.length(2);
        });
    });
    
    describe('#delete()', function() {
         
        var order1, order2;
        
        beforeEach(function() {
            order1 = o.clone(orderExample);
            order2 = o.clone(orderExample);
            order1 = orderService.create(order1);
            order2 = orderService.create(order2);
        });
        
        it('should delete the order if the ID exists', function() {
            var order1Id = order1.getId();
            orderService.delete(order1Id);
            var orders = orderService.list();
            
            _.each(orders, function (order) {
                order.getId().should.not.be.equal(order1Id);
            });
        });
        
        it('should return the order when deleted', function() {
            var deletedOrder = orderService.delete(order1.getId());
            deletedOrder.getId().should.be.equal(order1.getId());
        });
        
        it('should decrease the number of items of orders', function() {
            var total = orderService.list().length;
            orderService.delete(order2.getId());
            orderService.list().should.have.length(total - 1);
        });
        
        it('should return nothing when the ID does not exist', function () {
            should.not.exist(orderService.delete(500));
        });
    });
    
    describe('#update()', function() {
        
    });
});