
var request = require('supertest'),
    express = require('express'),
    orderResource = require('../../resources/order-resource');

var app = express();

app
    .get(orderResource.GET_URL, orderResource.get)
    .get(orderResource.LIST_URL, orderResource.list)
    .post(orderResource.CREATE, orderResource.create)
    .put(orderResource.UPDATE, orderResource.update)
    .delete(orderResource.DELETE, orderResource.delete);

describe('Order', function() {
    
    describe('#list()', function() {
        it('should return nothing when there are no orders', function(done) {
            var s = app.listen(function(){
            var url = 'http://localhost:' + s.address().port;
              
            request(url)
                .get(orderResource.LIST_URL)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect('[]', done);
        });
        });
    });
    
    describe('#get()', function() {
        
    });
    
    describe('#create()', function() {
        
    });
    
    describe('#update()', function() {
        
    });
    
    describe('#delete()', function() {
        
    });
});