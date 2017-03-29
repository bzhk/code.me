var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	if(!req.user){
		return res.redirect("/");
	}

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'dodaj_ogloszenie';
	locals.form = req.body;

	view.on("post", function(next){
      var data = locals.form;
      var errors = [];
			async.series([
				function(done){
					//Sprawdzenie pól forma
					done()
				},
				function(done){
					//Dodanie forma jako model Post do bazy
					done()
				},

			],function(err){
	      if(err){
	        return next();
	      }
	      req.flash("success", "Ogłoszenie zostało dodane do zatwierdzenia");
	      res.redirect("/");
			});
		});

	// Render the view
	view.render('addPost');
};
