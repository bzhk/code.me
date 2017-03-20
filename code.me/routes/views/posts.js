var keystone = require('keystone');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'post';
	locals.data = {
			posts: [],
		};

	// Load the posts
	view.on('init', function (next) {

		keystone.list('Post').paginate({
			perPage: 100,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author')
			.exec(function (err, results) {
				locals.data.posts = results;
				next(err);
		});
	});

	// Render the view
	view.render('posts');
};
