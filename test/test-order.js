var should = require("should"),
    Order = require('../models/order');

describe('Order', function(){
    var order;
    
    beforeEach(function() {
        order = new Order();
    })
    
    describe('#validate()', function() {
        it('should be valid when the order has ID', function() {
            order.hydrateFrom({id : 1});
            var validationResult = order.validate();
            validationResult.valid.should.be.ok;
        })
        it('should be invalid when the order has empty ID field', function(){
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.id.should.not.be.empty;
        })
        it('should be invalid when the order has a non numeric ID', function() {
            order.hydrateFrom({id : 'ABC'});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.id.should.not.be.empty;
        })
        it('should be invalid when the order has non valid location', function() {
            order.hydrateFrom({id : 1, location: 'Delivery'});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.location.should.not.be.empty;
        })
        it('should be invalid when the order has non numeric cost', function() {
            order.hydrateFrom({id : 1, cost: 'three hundred'});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.cost.should.not.be.empty;
        })
        it('should be invalid when the order has no collection for items', function() {
            order.hydrateFrom({id : 1, items: 'a coffee'});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.items.should.not.be.empty;
        })
        
        /*it('should be invalid when the order has an invalid item', function() {
            var invalidItem = {name: 'coffe', quantity: 5};
            order.hydrateFrom({id : 1, items: [invalidItem]});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.items.should.not.be.empty;
        })*/
    })
    
    describe('#hydrateFrom(order)', function() {
        it('should copy the properties from the raw order', function() {
            order.hydrateFrom({id: 1, location: 'something', cost: 3.45});
            order.getId().should.be.equal(1);
            order.getLocation().should.be.equal('something');
            order.getCost().should.be.equal(3.45);
        })
        
        it('should copy an hydrated item from the raw order', function() {
            var items = [{}, {}];
            order.hydrateFrom({id: 1, items: items});
            order.getItems().should.have.length(2);
        })
    });
})
