var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res),
    	locals = res.locals,
      slug = res.socket.parser.incoming.headers.referer,
      slug = slug.split("/"),
      slug = slug[slug.length-1],
			date = new Date(),
			chfexp = Array.isArray(req.body.chfexp)?req.body.chfexp:[req.body.chfexp];

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

						//    	 	expforemp.save();
						// console.log(				keystone.list('User').model
						// 				.update({slug:x},{$inc:{exp:post.expForEmp}}));
      })
			var efa = {
					post_slug: post.slug,
					post_id: post._id,
					aut_slug: req.user.slug,
					exp: post.expForEmp,
					emps: req.body.chfexp,
					date: date
				}
				var expForAut = keystone.list('expForAut').model,
						expforaut = new expForAut(efa);

						// expforaut.save();

			});


	// Render the view
  req.flash("success", "Ogłoszenie zostało zamknięte");
	res.redirect("/");
};
