var should = require('should'),
    Item = require('../models/item');

describe('Item', function(){
    var item;
    
    beforeEach(function() {
        item = new Item();
    })
    
    describe('#hydrateFrom(rawItem)', function() {
        
        it('should copy the properties from the raw item', function() {
            item.hydrateFrom({ name: 'capuccino',
                quantity : 2,
                milk : 'non-milk',
	            size : 'medium'});
            item.getName().should.be.equal('capuccino');
            item.getQuantity().should.be.equal(2);
            item.getMilk().should.be.equal('non-milk');
            item.getSize().should.be.equal('medium');
        })
    })
    
    describe('#validate()', function() {
        
        it('should be valid when having required fields', function() {
            item.hydrateFrom({name: 'mocaccino', quantity: 2});
            var validationResult = item.validate();
            validationResult.valid.should.be.ok;
        })
        
        it('should be invalid when not having name', function() {
            item.hydrateFrom({quantity: 3});
            var validationResult = item.validate();
            validationResult.valid.should.be.false;
            validationResult.details.name.should.not.be.empty;
        })
        
        it('should be invalid when not having quantity', function() {
            item.hydrateFrom({name: 'capuccino'});
            var validationResult = item.validate();
            validationResult.valid.should.be.false;
            validationResult.details.quantity.should.not.be.empty;
        })
        
    })
})