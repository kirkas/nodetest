define(["../views/Signup"],function(e){describe("Signup spec",function(){SignupView=new e,it("load and show the Signup view",function(){SignupView.render(),expect(SignupView).not.toBe(null),expect(SignupView.el).toBe("div.signup-box"),expect($(SignupView.el).find("input").length).not.toBe(0)});var t,n,r,i;beforeEach(function(){SignupView.render(),t=$(SignupView.el).find("form"),n=$(SignupView.el).find("input[name='username']"),r=$(SignupView.el).find("input[name='email']"),i=$(SignupView.el).find("input[name='password']"),n.val("asdf"),r.val("asdf@asdf.ce"),i.val("password"),spyEvent=spyOnEvent(t,"submit")}),it("return error if name is empty",function(){n.val(""),t.submit(),expect("submit").toHaveBeenPreventedOn(t),expect(n.data("error")).toEqual(validation.nameRequire),expect(n.hasClass("invalid")).toBe(!0),expect(SignupView.signup()).toBe(!1)}),it("return error if email is empty",function(){r.val(""),t.submit(),expect("submit").toHaveBeenPreventedOn(t),expect(r.data("error")).toEqual(validation.emailRequire),expect(r.hasClass("invalid")).toBe(!0),expect(SignupView.signup()).toBe(!1)}),it("return error if email badly formatted",function(){r.val("asdf@asdf"),t.submit(),expect("submit").toHaveBeenPreventedOn(t),expect(r.data("error")).toEqual(validation.emailFormat),expect(r.hasClass("invalid")).toBe(!0),expect(SignupView.signup()).toBe(!1)}),it("return error if password is empty",function(){i.val(""),t.submit(),expect("submit").toHaveBeenPreventedOn(t),expect(i.data("error")).toEqual(validation.passwordRequire),expect(i.hasClass("invalid")).toBe(!0),expect(SignupView.signup()).toBe(!1)}),it("return confirmation if all data are correctly formatted",function(){t.submit(),expect("submit").toHaveBeenPreventedOn(t)});return})});