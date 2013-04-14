define([
'marionette', 
'views/User', 
'collections/Users'], function(
	Marionette, UserView, UsersCollection) {

  return Marionette.CollectionView.extend({
    itemView: UserView,
    
    initialize: function() {
	    var that = this;
      this.collection = new UsersCollection();
      this.collection.fetch(); // NEW

    }
  });

});