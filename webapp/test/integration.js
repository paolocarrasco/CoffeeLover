var page = require('webpage').create();
page.open('http://coffee-lover.paolocarrasco.c9.io', function () {
    var addLink = page.evaluate(function(){
        return document.getElementId('addOrder');
    });
    
    phantom.exit();
});
