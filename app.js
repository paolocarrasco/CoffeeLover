var express = require('express'),
    orderResource = require('./resources/order-resource'),
    coffeeShopResource = require('./resources/coffee-shop-resource');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(__dirname + '/webapp'));

app
    // ---- Coffee Shop ---- //
    .options(coffeeShopResource.RESOURCES_URL, coffeeShopResource.resources) 
    // ---- Orders ----- //
    .get(orderResource.GET_URL, orderResource.get)
    .get(orderResource.LIST_URL, orderResource.list)
    .post(orderResource.CREATE, orderResource.create)
    .put(orderResource.UPDATE, orderResource.update)
    .delete(orderResource.DELETE, orderResource.delete);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Ready to share caffeinated love to everyone! ... and for just a few dollars');
});