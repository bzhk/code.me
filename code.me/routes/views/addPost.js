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

					if(!data.title){
						errors.push("Brak tytułu ogłoszenia.")
					}

					if(isNaN(data.minSalary)){
						errors.push("Stawka minimalna musi być liczbą.")
					}else if(!data.minSalary){
						errors.push("Brak stawki minimalnej.")
					}

					if(isNaN(data.maxSalary)){
						errors.push("Stawka maksymalna musi być liczbą.")
					}else if(!data.maxSalary){
						errors.push("Brak stawki maksymalnej.")
					}

					if(!data.contentBrief){
						errors.push("Brak krótkiej treści ogłoszenia")
					}

					if(!data.contentExtended){
						errors.push("Brak długiej treści ogłoszenia")
					}

					errors.forEach(function(err){
						req.flash("error",err);
					})
					if(errors.length){
						return done(true);
					}

					done();
				},
				function(done){
					var postData={
						title: data.title,
						minSalary: data.minSalary,
						maxSalary: data.maxSalary,
						remote: data.remote,
						salaryType: data.salaryType,
						author: req.user,
						content: {
							brief: data.contentBrief,
							extended: data.contentExtended
						}
						};
						var Post = keystone.list("Post").model,
								post = new Post(postData);

							post.save(function(err){
								console.log(err);
								done(err);
							});

				}

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
