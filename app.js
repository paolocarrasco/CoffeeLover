var express = require('express'),
    orders = require('./resources/order-resource'),
    coffeeShop = require('./resources/coffee-shop-resource');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app
    // ---- Coffee Shop ---- //
    .options(coffeeShop.RESOURCES_URL, coffeeShop.resources) 
    // ---- Orders ----- //
    .get(orders.GET_URL, orders.get)
    .get(orders.LIST_URL, orders.list)
    .post(orders.CREATE, orders.create)
    .put(orders.UPDATE, orders.update)
    .delete(orders.DELETE, orders.delete);
    
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Ready to share caffeinated love to everyone! (for just a few dollars');
});