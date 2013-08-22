var resources = [
  { name: 'orders', description : "Orders of coffee"},
  { name: 'payments', description : "Payments of orders"},
  { name: 'receipts', description : "Receipts of payments done"}
];

exports.RESOURCES_URL = '/';

exports.resources = function(req, res) {
    res.json(resources);
};