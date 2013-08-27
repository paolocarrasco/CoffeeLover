$(function() {
    $.getJSON('orders/', function(result) {
        var orderList = {orders: result};
        var orderListTemplate = $('#order-list').text();
        var output = Mustache.render(orderListTemplate, orderList);
        $('#content-app').html(output);
    });
});