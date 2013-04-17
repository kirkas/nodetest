define(['../views/Signup'], function(Signup) {

	describe("Signup spec", function() {

	SignupView = new Signup();

	it("load and show the Signup view", function() {
		SignupView.render();
		expect(SignupView).not.toBe(null);
		expect(SignupView.el).toBe("div.signup-box");
		expect($(SignupView.el).find("input").length).not.toBe(0);
	});

	var form;
	var inputName;
	var inputEmail;
	var inputPassword;

		beforeEach(function() {
			SignupView.render();
			form = $(SignupView.el).find("form");
			inputName = $(SignupView.el).find("input[name='username']");
			inputEmail = $(SignupView.el).find("input[name='email']");
			inputPassword = $(SignupView.el).find("input[name='password']");
			inputName.val("asdf");
			inputEmail.val("asdf@asdf.ce");
			inputPassword.val("password");
			spyEvent = spyOnEvent(form, 'submit');
		});
		
    it("return error if name is empty", function() {
      inputName.val("");
      form.submit();
      expect('submit').toHaveBeenPreventedOn(form);
      expect(inputName.data("error")).toEqual(validation.nameRequire);
      expect(inputName.hasClass("invalid")).toBe(true);
      expect(SignupView.signup()).toBe(false);
    });
    
    it("return error if email is empty", function() {
      inputEmail.val("");
      form.submit();
      expect('submit').toHaveBeenPreventedOn(form);
      expect(inputEmail.data("error")).toEqual(validation.emailRequire);
      expect(inputEmail.hasClass("invalid")).toBe(true);
      expect(SignupView.signup()).toBe(false);
    });

    it("return error if email badly formatted", function() {
			inputEmail.val("asdf@asdf");
			form.submit();
			expect('submit').toHaveBeenPreventedOn(form);
			expect(inputEmail.data("error")).toEqual(validation.emailFormat);
			expect(inputEmail.hasClass("invalid")).toBe(true);
			expect(SignupView.signup()).toBe(false);
    });

		it("return error if password is empty", function() {
			inputPassword.val("");
			form.submit();
			expect('submit').toHaveBeenPreventedOn(form);
			expect(inputPassword.data("error")).toEqual(validation.passwordRequire);
			expect(inputPassword.hasClass("invalid")).toBe(true);
			expect(SignupView.signup()).toBe(false);
    });
    

    
    
    it("return confirmation if all data are correctly formatted", function() {
			form.submit();
			expect('submit').toHaveBeenPreventedOn(form);
			// expect(inputPassword.hasClass("success")).toBe(true);
			// expect(inputEmail.hasClass("success")).toBe(true);
			// expect(inputName.hasClass("success")).toBe(true);
			// expect(SignupView.signup()).toBe(true);
    });
    
    
    /* Need to add server for test
    it("The model attributes are the same as the one enter", function() {
			form.submit();
			expect('submit').toHaveBeenPreventedOn(form);
			expect(SignupView.model.get("name")).toBe("asdf");
			expect(SignupView.model.get("email")).toBe("asdf@asdf.ce")
			expect(SignupView.model.get("password")).toBe("password")
    });
		*/
		return;
		
  });
});