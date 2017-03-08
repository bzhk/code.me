var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
	autokey: { path: 'key', from: 'nick', unique: true },
 	map: { name: 'key' },
 	defaultSort: '-key'
});

User.add({
	nick: { type: String, initial: true, required: true,index: true,unique: true },
	name: { type: Types.Name, required: true,initial: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
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
User.defaultColumns = 'key,name,nick, email, isAdmin, agr';
User.register();
