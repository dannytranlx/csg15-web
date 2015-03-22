define(function (require) {
  var Backbone = require('backbone');
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  // Shim to replace Backbone.Wreqr with Backbone.Radio
  Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  };

  // Create our Application
  var app = new Mn.Application();

  // Start history when our application is ready
  app.on('start', function () {
    Backbone.history.start();
  });

  // Modules
  app.module('Auth', require('modules/auth/index'));
  app.module('Navigation', require('modules/navigation/index'));
  app.module('Home', require('modules/home/index'));
  app.module('Users', require('modules/users/index'));

  // Regions
  app.addRegions({
    header: '#header',
    content: '#content',
    footer: '#footer'
  });

  return app;
});
