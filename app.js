var express = require('express');

app = express();

var resources = [
  { name: 'orders', description : "Orders of coffee"},
  { name: 'payments', description : "Payments of orders"},
  { name: 'receipts', description : "Receipts of payments done"}
];

app
    .get('/', function(req, res) {
        res.json(resources);
    }) 
    .get('/orders/:id', function(req, res) {
        var order = {};
        order.id = 1;
        order.requested = '10/20/2013';
        res.json(order);
    })
    .post('/orders', function(req, res) {
        res.json({msg:'hey!!'})
    });
    
app.listen(process.env.PORT || 8080);