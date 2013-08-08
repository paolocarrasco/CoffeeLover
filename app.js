var express = require('express');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

var resources = [
  { name: 'orders', description : "Orders of coffee"},
  { name: 'payments', description : "Payments of orders"},
  { name: 'receipts', description : "Receipts of payments done"}
];

var orders = [];

app
    .get('/', function(req, res) {
        res.json(resources);
    }) 
    .get('/orders/:id', function(req, res) {
        var order = orders[req.params.id];
        res.json(order);
    })
    .get('/orders', function(req, res) {
        res.json(orders);
    })
    .post('/orders', function(req, res) {
        var order = req.body;
        orders.push(order);
        res.end();
    });
    
app.listen(process.env.PORT || 8080);