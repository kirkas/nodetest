define(['views/App'], function(App) {

	describe("App setup Spec", function() {
		it("load library (jQuery, Underscore, Backbone, Marionette)", function() {
			expect($).toBeDefined();
			expect($).not.toBe(null);
			expect(_).toBeDefined();
			expect(_).not.toBe(null);
			expect(Backbone).toBeDefined();
			expect(Backbone).not.toBe(null);
			expect(Marionette).toBeDefined();
			expect(Marionette).not.toBe(null);
		});

		it("load App", function() {
			expect(App).not.toBe(null);
		});

	});
});