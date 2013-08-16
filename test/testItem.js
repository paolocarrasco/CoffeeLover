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
})