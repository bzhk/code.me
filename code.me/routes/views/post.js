var keystone = require('keystone');


exports = module.exports = function (req, res) {


    var view = new keystone.View(req, res);
    var locals = res.locals;


    locals.section = 'post';
    locals.data = {
      newEmp: [],
      users_id: [],
      users_exp: []
    };
    var users_id = locals.data.users_id,
        users_exp = locals.data.users_exp;




    view.on('init', function(next){

      keystone.list('Post').model
        .findOne({
          state: 'published',
          slug: req.params.slug
        })
        .populate('author')
        .exec(function(err, results){

          locals.post = results;
          next(err);
      });
    });


    view.on('init', function(next){

      keystone.list('newEmp').model
      .find({
        post_slug: req.params.slug
      }).exec(function(err, results){

        locals.data.newEmp = results;

        results.forEach(function(x){
          users_id.push( x.user_id);
        });

        users_id.forEach(function(x){
          keystone.list('User').model
          .find({
            _id: x
          }).exec(function(err, results){
            results.forEach(function(x){
              users_exp.push(x);
            });
          });
        });
        next(err);
      })

    });



	// Render the view
	view.render('post');



};
