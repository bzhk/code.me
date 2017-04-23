var keystone = require('keystone');


exports = module.exports = function (req, res) {


    var view = new keystone.View(req, res);
    var locals = res.locals;



    view.on('init', function(next){

      keystone.list('User').model
        .findOne({
          slug: req.params.slug
        })
        .populate('author')
        .exec(function(err, results){

          locals.profile = results;
          next(err);
      });
    });


    // Render the view
    view.render('user');



  };
