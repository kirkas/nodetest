define(['backbone', 'models/User'], function(Backbone, UserModel) {

  return Backbone.Collection.extend({
    model: UserModel,
    url: "/api/users" // NEW
  });

});