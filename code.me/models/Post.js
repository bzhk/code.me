var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Datetime, index: true, dependsOn: { state: 'published' } },
  salaryType: {type: Types.Select, require: true, initial: true, options: 'na godzinę, na tydzień, na miesiąc'},
	minSalary: { type: Number, required: true, initial: true },
	maxSalary: { type: Number, required: true, initial: true },
  remote: { type: Types.Select, required: true, initial: true, options: 'nie, tak'},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	applyGr: {type: Types.TextArray},
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
