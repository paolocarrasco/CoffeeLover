var OrderService = require('../../services/order-service');

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
            var order1 = orderExample;
            var order2 = {cost: 5.4, items: [{name: 'capuccino', quantity: 5}, {name: 'expresso', quantity: 1}]};
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
    
});