/*
  Author: https://github.com/fabriziomoscon
  After requiring `should,js` it is impossible to add a var called `should` to the global namespace.
  This workaround makes should available in all test files
*/

var shouldObject = {
  exist: function() {
    return require("should").exist;
  },
  not: function() {
    return function(){
      return require("should").not;
    };
  }
};

shouldObject.not.exist = function() {
  return function(){
    return require("should").not.exist;
  };
};

global.should = shouldObject;