define(['backbone', 'globals/validation'], function(Backbone) {

  return Backbone.Model.extend({
    
    url:function(){
      return (this.id) ? '/api/user/' + this.id : '/api/user';
    },
    
    idAttribute: "_id",
    
    defaults: {
      username: "",
      email: "",
      password: ""
    },

    validation: {
      username: {
        required: true,
        msg: validation.nameRequire
      },
      email: [{
        required: true,
        msg: validation.emailRequire
      }, {
        pattern: 'email',
        msg: validation.emailFormat
      }],
      password: {
        required: true,
        msg: validation.passwordRequire
      }
    },


  });

});