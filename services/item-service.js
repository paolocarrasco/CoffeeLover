var ItemService = function () {
    var me = this;
    me.list = function () {
        return ['coffee', 'express coffee', 'american special', 'regular capuccino', 'regular mochaccino', 'regular frapuccino', 'hot chocolate', 'milkshake', 'tea', 'hot cocoa', 'coffee with milk'];
    };
};

module.exports = ItemService;