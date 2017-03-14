var keystone = require('keystone');

exports = module.exports = function (req, res) {

	if (req.user) {
	return res.redirect('/');
}

	var view = new keystone.View(req, res),
	    locals = res.locals;
			locals.section = "zaloguj";
			locals.form = req.body;

	view.on('post', function(next) {

		var data = locals.form;

		if (!data.email || !data.password) {
			req.flash('error', 'Musisz wprowadzić nazwę użytkownika i hasło.');
			return next();
		}
		var onSuccess = function(){
			req.flash('success','Zostałeś poprawnie zalogowany.');
			return res.redirect('/');
		}
		var onFail = function(){
			req.flash('error','Wprowadziłeś błędną nazwę użytkownika lub hasło.');
			return next()
		}
		keystone.session.signin({email: data.email, password: data.password}, req, res, onSuccess, onFail);
	});

	// Render the view
	view.render('signin');
};
