var keystone = require('keystone');

exports = module.exports = function (req, res) {


    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'post';


    view.on('init', function(done){

      keystone.list('Post').model
        .findOne({
          state: 'published',
          slug: req.params.slug
        })
        .populate('author')
        .exec(function(err, results){
          locals.post = results;
          done(err);
      });
    });

	// Render the view
	view.render('post');
};
