/*global requirejs:false*/
// Place third party dependencies in the vendor folder
requirejs.config({
    "baseUrl": "js/app",
    "paths": {
      "vendor": "../vendor",
      "jquery": ["//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min", 'vendor/jquery-1.10.1.min'],
      "mustache": ["//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.2/mustache.min", "vendor/mustache.0.7.2.min"]
    }
});

// Load the main app module to start the app
requirejs(["main"]);