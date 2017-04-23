var keystone = require('keystone');


exports = module.exports = function (req, res) {


    var view = new keystone.View(req, res);
    var slug = res.socket.parser.incoming.headers.referer;
    slug = slug.split("/");
    slug = slug[slug.length-1];


        keystone.list('Post').model
        .findOne({
          slug: slug
        }, function(err, post){
          if(err){return err}
          var emp = {
            post_slug: post.slug,
            post_id: post._id,
            user_slug: req.user.slug,
            user_id: req.user._id,
            nick: req.user.nick,
            email: req.user.email,
          }
          var newEmp = keystone.list('newEmp').model,
              newemp = new newEmp(emp);

          newemp.save();
        });





          req.flash("success", "Zostałeś dodany.");
          res.redirect("/ogloszenia/"+slug);


};
