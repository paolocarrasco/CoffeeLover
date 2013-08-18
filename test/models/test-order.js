var _ = require('underscore'),
    should = require("should"),
    Order = require('../../models/order');

describe('Order', function(){
    var order, EMPTY_OBJECT = {};
    
    beforeEach(function() {
        order = new Order();
    });

    describe('#hydrateFrom(order)', function() {
        
        it('should copy the properties from the raw order', function() {
            order.hydrateFrom({id: 1, location: 'something', cost: 3.45});
            order.getId().should.be.equal(1);
            order.getLocation().should.be.equal('something');
            order.getCost().should.be.equal(3.45);
        });
        
        it('should consider a default cost', function() {
            order.hydrateFrom(EMPTY_OBJECT);
            order.getCost().should.be.equal(0);
        });
        
        it('should copy an hydrated item from the raw order', function() {
            var items = EMPTY_OBJECT;
            order.hydrateFrom({id: 1, items: items});
            var items = order.getItems()
            items.should.have.length(1);
            items[0].should.have.property('hydrateFrom');
        });
        
        it('should consider as default location "Take Away"', function() {
            order.hydrateFrom(EMPTY_OBJECT);
            order.getLocation().should.be.equal(Order.TAKE_AWAY);
        });
        
        it('should copy hydrated items from the raw order', function() {
            var items = [EMPTY_OBJECT, EMPTY_OBJECT];
            order.hydrateFrom({id: 1, items: items});
            var items = order.getItems()
            items.should.have.length(2);
            _.each(items, function(item) {
                item.should.have.property('hydrateFrom');
            });
        });
        
        it('should have an empty list of items after hydrating when receiving a null', function() {
            order.hydrateFrom({id: 1, items: null});
            var items = order.getItems();
            items.should.be.empty;
        });
        
    });
    
    describe('#validate()', function() {
        
        it('should be invalid when the order has a non numeric ID', function() {
            order.hydrateFrom({id : 'ABC'});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.id.should.not.be.empty;
        });
        
        it('should be invalid when the order has non valid location', function() {
            order.hydrateFrom({location: 'Delivery'});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.location.should.not.be.empty;
        });
        
        it('should be valid if the order has cost zero (a gift)', function() {
            order.hydrateFrom({cost: 0, items: [{name: 'mocaccino', quantity: 2}]});
            var validationResult = order.validate();
            validationResult.valid.should.be.true;
        });
        
        it('should be invalid when the order has non numeric cost', function() {
            order.hydrateFrom({cost: 'three hundred'});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.cost.should.not.be.empty;
        });
        
        it('should be invalid when the order has an invalid item', function() {
            var invalidItem = {name: 'coffe'};
            order.hydrateFrom({items: invalidItem});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.items.should.not.be.empty;
        });
        
        it('should be invalid when the order has an empty list of items', function() {
            order.hydrateFrom({items: []});
            var validationResult = order.validate();
            validationResult.valid.should.be.false;
            validationResult.details.items.should.not.be.empty;
        });
        
    });
    
});
