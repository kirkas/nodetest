define(['marionette', 'text!templates/userItem.html'], function(Marionette, template) {

  return Marionette.ItemView.extend({
    //Template HTML string
    template: Handlebars.compile(template),
    className: "user",
    ui: {
      removeButton: ".remove"
    },

    events: {
      "click .remove": "removeUser"
    },

    initialize:function(){

    },

    serialize: function() {
      return {
        username: this.model.get("username"),
        email: this.model.get("email")
      }
    },

    removeUser: function() {
      this.model.destroy();
    },

  });

});