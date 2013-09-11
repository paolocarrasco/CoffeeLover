define(['require', 'app'], function (require, App) {
    var should = require('chai').should();
    describe('CoffeeLover', function () {
        it('should exist the app', function () {
            should.exist(App);
        });
    }); 
});