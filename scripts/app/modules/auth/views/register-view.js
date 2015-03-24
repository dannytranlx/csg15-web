define(function (require) {
  require('bootstrap');
  var Mn = require('marionette');

  return Mn.ItemView.extend({
    className: 'container',
    template: require('hbars!../templates/register-template'),

    ui: {
      registerForm: '[data-ui-register-form]',
      alertBanner: '[data-ui-alert-banner]'
    },

    events: {
      'submit @ui.registerForm': 'onSubmit'
    },

    onRender: function () {
      this.hideBanner();
    },

    onSubmit: function (e) {
      e.preventDefault();
      this.hideBanner();

      var data = {
        'email': $('input[name=email]').val(),
        'password': $('input[name=password]').val()
      };

      this.trigger('auth:register', data);
    },

    showBanner: function (text, type) {
      this.ui.alertBanner.addClass('alert-' + type);

      if (type === 'success') {
        this.ui.alertBanner.html(text);
      }

      this.ui.alertBanner.show();
    },

    hideBanner: function () {
      this.ui.alertBanner.removeClass(function (index, css) {
        return (css.match (/(^|\s)alert-\S+/g) || []).join(' ');
      });

      this.ui.alertBanner.hide();
    }
  });
});
