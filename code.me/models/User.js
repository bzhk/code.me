var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
	autokey: { path: 'slug', from: 'nick', unique: true },
 	map: { name: 'nick' },
 	defaultSort: '-key'
});

User.add({
	nick: { type: String, initial: true, required: true,index: true,unique: true },
	name: { type: Types.Name, required: true,initial: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	website: { type: Types.Url},
	fb_profile: {type: Types.Url},
	about: {type: Types.Html, wysiwyg: true, height: 400},
	exp:{type: Types.Number, default:'0'},
	techstack:{type: String},
	prog_lev:{type: Types.Select, options:'Programowanie to hobby, Uczę się na programistę, Junior Developer, Mid-Level Developer, Senior Developer'},
	password: { type: Types.Password, initial: true, required: true },
	agr: { type: Boolean, label:'Akceptacja Regulaminu',initial: true, required: true },
}, 'Prawa', {
	isAdmin: { type: Boolean, label: 'Prawa Admina',initial: true, index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'nick, name, email, isAdmin, agr';
User.register();
