var express = require('express'),
    orders = require('./resources/orders'),
    coffeeShop = require('./resources/coffee-shop');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app
    // ---- Coffee Shop ---- //
    .get(coffeeShop.RESOURCES_URL, coffeeShop.resources) 
    // ---- Orders ----- //
    .get(orders.GET_URL, orders.get)
    .get(orders.LIST_URL, orders.list)
    .post(orders.CREATE, orders.create)
    .put(orders.UPDATE, orders.update)
    .delete(orders.DELETE, orders.delete);
    
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Coffee Lover is ready to share coffee love to everyone');
});