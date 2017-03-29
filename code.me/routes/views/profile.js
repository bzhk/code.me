var keystone = require('keystone');
const async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

  if(!req.user){
    return res.redirect("/zaloguj");
  }
	var locals = res.locals;
	locals.section = "profil";
	locals.form = req.body;

	view.on("post", function(next){
			var data = locals.form;
			var errors = [];
			async.series([
				function(done){
					if(!data.password){
						errors.push("Wprowadź nowe hasło")
					}
					if(data.password != data.passwordRep){
						errors.push("Hasła różnią się")
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
								req.user.password = data.password;
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
	view.render('profile');
};
