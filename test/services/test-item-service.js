var ItemService = require("../../services/item-service");

describe('ItemService', function() {
    var itemService;
    beforeEach(function () {
        itemService = new ItemService();
    });
    
    describe('#list()', function() {
        it('should retrieve many items', function () {
            var items = itemService.list();
            items.should.be.instanceof(Array);
            items.should.not.be.empty;
            items[0].should.be.ok;
        });
    });
});