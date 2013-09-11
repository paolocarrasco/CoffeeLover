/*global requirejs:false*/
// Place third party dependencies in the vendor folder
requirejs.config({
    "baseUrl": "../js/app",
    "paths": {
        "specs": "../../test/specs",
        "vendor": "../vendor",
        "chai": "../../test/lib/chai",
        "mocha": "../../test/lib/mocha",
        "jquery": ["//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min", 'vendor/jquery-1.10.1.min']
    }
});

require(['require', 'chai', 'mocha'], function(require, chai){
 
  var should = chai.should();
 
  /*globals mocha */
  mocha.setup('bdd');
 
  require([
    'specs/appTest',
  ], function(require) {
    mocha.run();
  });
 
});