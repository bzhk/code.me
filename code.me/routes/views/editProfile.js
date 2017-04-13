var keystone = require('keystone');
const async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

  if(!req.user){
    return res.redirect("/zaloguj");
  }
	var locals = res.locals;
	locals.section = "edytuj_profil";
	locals.form = req.body;
	console.log(req.user.webstie);
	console.log(locals.form.accWS);

	view.on("post", function(next){
			var data = locals.form;
			var errors = [];
			console.log(locals.form);
			async.series([
				function(done){
					if(data.password || data.passwordRep){
						if(data.password != data.passwordRep){
							errors.push("Hasła różnią się")
						}
					}
					if(data)
						errors.forEach(function(err){
							req.flash("error",err);
					})
					if(errors.length){
						return done(true);
					}
					done();
				},
					function(done){

							keystone.list("User").model.findOne({
								email: req.user.email
							},function(err,user){
								if(err){
									return done(err);
								}
								if(data.password && data.password === data.passwordRep){
									req.user.password = data.password;
								}

								req.user.fb_profile = data.accFBPI;
								req.user.website = data.accWS;
								req.user.about = data.about;
								req.user.techstack = data.accTS;
								req.user.prog_lev = data.accPLev;
								req.user.save(function(err){
									if(err){
										return done(err);

									}
								})
								done();
							})

					}


			],function(err){
	      if(err){
	        return next();
	      }
	      req.flash("success", "Dane zostały zmienione");
	      res.redirect("/profil");
			});
		});

	// Render the view
	view.render('editProfile');
};
