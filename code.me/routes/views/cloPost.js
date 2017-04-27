var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res),
    	locals = res.locals,
      slug = res.socket.parser.incoming.headers.referer,
      slug = slug.split("/"),
      slug = slug[slug.length-1],
			date = new Date(),
			chfexp = Array.isArray(req.body.chfexp)?req.body.chfexp:[req.body.chfexp];


			view.on('init', function(next){

		      keystone.list('Post').model
		      .findOne({
		        slug: slug
		      }, function(err, post){
						chfexp.forEach(function(x){
		        if(err){return err}
		        var efe = {
		          post_slug: post.slug,
		          post_id: post._id,
		          user_slug: x,
		          exp: post.expForEmp,
		          date: date
		        }

		         var expForEmp = keystone.list('expForEmp').model,
		             expforemp = new expForEmp(efe);

								expforemp.save();
								keystone.list('User').model
								.update({slug:x},{$inc:{exp:post.expForEmp}},{new: true}, function(err, doc){
									if(err){console.log("Wystąpił błąd: "+err)}
									console.log(doc)
								});
							});


					var newExp = post.expForEmp*1.25,
					efa = {
							post_slug: post.slug,
							post_id: post._id,
							aut_slug: req.user.slug,
							exp: newExp,
							emps: req.body.chfexp,
							date: date
						};

						var expForAut = keystone.list('expForAut').model,
								expforaut = new expForAut(efa);


					  expforaut.save();

						keystone.list('User').model
						.update({slug:req.user.slug},{$inc:{exp:newExp}},{new: true}, function(err, doc){
							if(err){console.log("Wystąpił błąd: "+err)}
							console.log(doc)
						});

						keystone.list('Post').model
						.update({slug:post.slug},{$set:{state:'archived'}},{new: true}, function(err, doc){
							if(err){console.log("Wystąpił błąd: "+err)}
							console.log(doc)
						});

					});
				});


  req.flash("success", "Ogłoszenie zostało zamknięte");
	res.redirect("/");
};
