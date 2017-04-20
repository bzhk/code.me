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
          post.applyGr.push(req.user._id);
          post.save();
        });



        req.flash("success", "Zostałeś dodany.");
        res.redirect("/ogloszenia/"+slug);


};
