define(['jquery', 'vendor/mustache.0.7.2.min'], function($, Mustache) {
    'use strict';
   var App = function() {
        $.getJSON('orders/', function(result) {
            var orderList = {orders: result};
            var orderListTemplate = $('#order-list').text();
            var output = Mustache.render(orderListTemplate, orderList);
            $('#content-app').html(output);
        });
    };
    return App;
});